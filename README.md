# Vehicle Inventory Manager

A modern web application for managing vehicle inventory with a clean, intuitive interface. Built with vanilla JavaScript and Express.js.

## Features

- **Add Vehicles**: Register new vehicles with image, brand/model, year, color, and license plate
- **View Inventory**: Display all vehicles in a responsive table format
- **Remove Vehicles**: Delete vehicles from inventory by license plate
- **Company Information**: Dynamic display of dealership information

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **API**: RESTful API for vehicle management

## Project Structure

```
vehicle-inventory-manager/
├── public/              # Static assets and frontend code
│   ├── css/           # Stylesheets
│   ├── img/           # Images and icons
│   └── js/            # JavaScript modules
│       ├── lib/       # Utility libraries (DOM, AJAX)
│       └── main.js    # Main application logic
├── server/            # Backend API server
│   ├── routes/        # API route handlers
│   └── app.js         # Express application setup
├── company.json       # Company/dealership configuration
└── index.html         # Main HTML entry point
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vehicle-inventory-manager
```

2. Install server dependencies:
```bash
cd server
npm install
# or
yarn install
```

3. Start the API server:
```bash
npm start
# or
node app.js
```

The server will start on `http://localhost:3000`

4. Open `index.html` in your browser or serve it using a local web server.

## API Endpoints

- `GET /car` - Retrieve all vehicles
- `POST /car` - Add a new vehicle
- `DELETE /car` - Remove a vehicle by license plate

## Usage

1. Fill in the vehicle registration form with:
   - Image URL (must be a valid image URL)
   - Brand/Model (minimum 5 characters)
   - Year (4-digit year)
   - Color (minimum 3 characters)
   - License Plate (format: ABC-1234)

2. Click "Cadastrar" to add the vehicle to inventory

3. View all registered vehicles in the table

4. Click the remove icon to delete a vehicle

## License

GPL-3.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
