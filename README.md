# Veterinary Drug Dose Calculator

A fullstack web application for calculating veterinary drug dosages with a NestJS backend and React frontend.

## Features

- **Comprehensive Drug Database**: 50+ veterinary drugs with accurate dosing information
- **Multiple Species Support**: Canine, Feline, Bovine, Caprine, Ovine, and Porcine
- **Accurate Calculations**: Calculates total dose (mg) and volume to administer (ml)
- **User-Friendly Interface**: Clean, responsive React frontend
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Proper error handling for invalid inputs and API errors
- **CORS Enabled**: Backend configured for frontend communication

## Tech Stack

### Backend
- **NestJS** with TypeScript
- **CSV Parser** for drug data loading
- **Class Validator** for input validation
- **CORS** enabled for frontend communication

### Frontend
- **React** with TypeScript
- **Axios** for API communication
- **Responsive CSS** for mobile-friendly design
- **Vite** for fast development and building

## Project Structure
vet-dose-calculator/
├── backend/                    # NestJS API server
│   ├── src/
│   │   ├── data/
│   │   │   └── drug_data.csv   # Drug database with dosage information
│   │   ├── dose/               # Dose calculation module
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── interfaces/     # TypeScript interfaces
│   │   │   ├── dose.controller.ts
│   │   │   ├── dose.service.ts
│   │   │   └── dose.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   ├── types/
│   │   │   └── dose.types.ts   # TypeScript type definitions
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md


## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run start:dev
   \`\`\`

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

   The frontend will run on `http://localhost:3000`

## API Endpoints

### GET /drugs
Returns all available drugs and species for dropdown population.

**Response:**
\`\`\`json
{
  "drugs": ["Amoxicillin", "Enrofloxacin", ...],
  "species": ["Canine", "Feline", "Bovine", ...]
}
\`\`\`

### POST /dose/calculate
Calculates drug dose based on species, drug, and animal weight.

**Request Body:**
\`\`\`json
{
  "species": "Canine",
  "drug": "Amoxicillin",
  "weight": 25.5
}
\`\`\`

**Response:**
\`\`\`json
{
  "drug_info": {
    "drug_name": "Amoxicillin",
    "species": "Canine",
    "dose_rate_mg_per_kg": 10,
    "concentration_mg_per_ml": 250
  },
  "animal_weight_kg": 25.5,
  "total_dose_mg": 255,
  "volume_to_administer_ml": 1.02
}
\`\`\`

## Drug Database

The application includes 50+ veterinary drugs with the following information:
- Drug name
- Species compatibility
- Dose rate (mg/kg)
- Concentration (mg/ml)

### Included Drug Categories:
- **Antibiotics**: Amoxicillin, Enrofloxacin, Doxycycline, Cephalexin, etc.
- **NSAIDs**: Meloxicam, Carprofen, Ketoprofen, Firocoxib, etc.
- **Antiparasitics**: Ivermectin, Fenbendazole, Albendazole, Praziquantel, etc.
- **Specialized Antibiotics**: Florfenicol, Tulathromycin, Tilmicosin, etc.

## Usage

1. **Select Species**: Choose the animal species from the dropdown
2. **Select Drug**: Choose the medication from the available drugs
3. **Enter Weight**: Input the animal's weight in kilograms
4. **Calculate**: Click "Calculate Dose" to get the results
5. **View Results**: See the calculated total dose and volume to administer

## Validation & Error Handling

- **Input Validation**: All fields are required and validated
- **Weight Validation**: Must be a positive number
- **Drug-Species Compatibility**: Validates that the selected drug is available for the chosen species
- **API Error Handling**: Comprehensive error messages for various failure scenarios

## Important Notice

⚠️ **This calculator is for reference only. Always consult with a licensed veterinarian before administering any medication.**

## Development Scripts

### Backend
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
