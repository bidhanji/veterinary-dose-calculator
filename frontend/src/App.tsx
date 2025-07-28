"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getDrugsAndSpecies, calculateDose } from "./services/api"
import type { DoseCalculationResult } from "./types/dose.types"
import "./App.css"

interface DrugSpeciesData {
  drugs: string[]
  species: string[]
}

const App: React.FC = () => {
  const [drugSpeciesData, setDrugSpeciesData] = useState<DrugSpeciesData>({ drugs: [], species: [] })
  const [selectedSpecies, setSelectedSpecies] = useState<string>("")
  const [selectedDrug, setSelectedDrug] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [result, setResult] = useState<DoseCalculationResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDrugsAndSpecies()
        setDrugSpeciesData(data)
      } catch (err) {
        setError("Failed to load drug data. Please try again.")
        console.error("Error fetching drug data:", err)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResult(null)

    // Validation
    if (!selectedSpecies || !selectedDrug || !weight) {
      setError("Please fill in all fields")
      return
    }

    const weightNum = Number.parseFloat(weight)
    if (isNaN(weightNum) || weightNum <= 0) {
      setError("Please enter a valid positive weight")
      return
    }

    setLoading(true)

    try {
      const calculationResult = await calculateDose({
        species: selectedSpecies,
        drug: selectedDrug,
        weight: weightNum,
      })
      setResult(calculationResult)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to calculate dose. Please try again.")
      console.error("Error calculating dose:", err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedSpecies("")
    setSelectedDrug("")
    setWeight("")
    setResult(null)
    setError("")
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🐾 Veterinary Drug Dose Calculator</h1>
          <p>Calculate accurate drug dosages for veterinary patients</p>
        </header>

        <div className="main-content">
          <form onSubmit={handleSubmit} className="dose-form">
            <div className="form-group">
              <label htmlFor="species">Species:</label>
              <select
                id="species"
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select Species</option>
                {drugSpeciesData.species.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="drug">Drug:</label>
              <select
                id="drug"
                value={selectedDrug}
                onChange={(e) => setSelectedDrug(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select Drug</option>
                {drugSpeciesData.drugs.map((drug) => (
                  <option key={drug} value={drug}>
                    {drug}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Animal Weight (kg):</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="form-input"
                placeholder="Enter weight in kilograms"
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Calculating..." : "Calculate Dose"}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="result-card">
              <h2>📋 Dose Calculation Result</h2>

              <div className="result-section">
                <h3>Drug Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Drug:</span>
                    <span className="value">{result.drug_info.drug_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Species:</span>
                    <span className="value">{result.drug_info.species}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Dose Rate:</span>
                    <span className="value">{result.drug_info.dose_rate_mg_per_kg} mg/kg</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Concentration:</span>
                    <span className="value">{result.drug_info.concentration_mg_per_ml} mg/ml</span>
                  </div>
                </div>
              </div>

              <div className="result-section">
                <h3>Calculation Results</h3>
                <div className="calculation-results">
                  <div className="result-item highlight">
                    <span className="label">Animal Weight:</span>
                    <span className="value">{result.animal_weight_kg} kg</span>
                  </div>
                  <div className="result-item highlight">
                    <span className="label">Total Dose:</span>
                    <span className="value">{result.total_dose_mg} mg</span>
                  </div>
                  <div className="result-item highlight primary">
                    <span className="label">Volume to Administer:</span>
                    <span className="value">{result.volume_to_administer_ml} ml</span>
                  </div>
                </div>
              </div>

              <div className="warning">
                <strong>⚠️ Important:</strong> This calculator is for reference only. Always consult with a licensed
                veterinarian before administering any medication.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
