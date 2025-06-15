
// Major cities of Pakistan
export const majorCities = [
  "Karachi", 
  "Lahore", 
  "Faisalabad", 
  "Rawalpindi", 
  "Islamabad",
  "Gujranwala", 
  "Peshawar", 
  "Multan", 
  "Sialkot", 
  "Quetta",
  "Bahawalpur", 
  "Sargodha", 
  "Mardan", 
  "Gujrat", 
  "Sheikhupura"
];

// Time options - 1-hour intervals in 12-hour format with AM/PM
export const timeOptions = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM",
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

// Complete location data structure with provinces and cities
export const locationData = {
  "Punjab": [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", 
    "Sialkot", "Bahawalpur", "Sargodha", "Gujrat", "Sheikhupura"
  ],
  "Sindh": [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpurkhas"
  ],
  "KPK": [
    "Peshawar", "Mardan", "Abbottabad", "Kohat", "Swat", "Dera Ismail Khan"
  ],
  "Balochistan": [
    "Quetta", "Gwadar", "Turbat", "Khuzdar", "Hub", "Chaman"
  ],
  "Islamabad Capital Territory": [
    "Islamabad"
  ],
  "Gilgit-Baltistan": [
    "Gilgit", "Skardu", "Hunza", "Chilas", "Ghanche"
  ],
  "Azad Jammu & Kashmir": [
    "Muzaffarabad", "Mirpur", "Rawalakot", "Bagh", "Kotli"
  ]
};

// Extract provinces from locationData
export const provinces = Object.keys(locationData);

// All cities (flattened from locationData)
export const cities = Object.values(locationData).flat();
