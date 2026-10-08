// Comprehensive Mock Dataset for Vehicle Service Management System

export const MOCK_SERVICES = [
  {
    id: 'srv-1',
    title: 'Full Synthetic Oil & Filter Change',
    category: 'Maintenance',
    price: 89.99,
    estimated_time: '45 Mins',
    icon_name: 'Wrench',
    description: 'Complete engine flush, premium synthetic oil change, filter replacement, and 21-point safety inspection.',
    features: ['Engine Flush', '21-Point Safety Check', 'Fluid Top-off', 'Filter Replacement']
  },
  {
    id: 'srv-2',
    title: 'Brake System Overhaul',
    category: 'Safety & Brakes',
    price: 249.50,
    estimated_time: '2 Hours',
    icon_name: 'Disc',
    description: 'Front & rear brake pad replacement, rotor resurfacing/replacement, brake line bleeding and fluid flush.',
    features: ['Ceramic Brake Pads', 'Rotor Inspection & Resurfacing', 'Brake Fluid Bleed', 'Caliper Test']
  },
  {
    id: 'srv-3',
    title: 'Advanced Computer Diagnostics',
    category: 'Diagnostics',
    price: 65.00,
    estimated_time: '30 Mins',
    icon_name: 'Cpu',
    description: 'Full OBD-II sensor scan, ECU fault code analysis, electrical system check, and digital health report.',
    features: ['OBD-II Sensor Scan', 'Live ECU Data', 'Battery & Alternator Test', 'Full Diagnostic Report']
  },
  {
    id: 'srv-4',
    title: 'AC Climate System Service',
    category: 'Comfort & HVAC',
    price: 129.00,
    estimated_time: '1 Hour',
    icon_name: 'Wind',
    description: 'Refrigerant pressure check, AC leak detection, evaporator coil cleaning, and cabin air filter renewal.',
    features: ['Refrigerant Recharge', 'Leak Detection Test', 'Cabin Filter Renewal', 'Temperature Calibration']
  },
  {
    id: 'srv-5',
    title: '4-Wheel Precision Alignment',
    category: 'Tires & Steering',
    price: 119.99,
    estimated_time: '1 Hour',
    icon_name: 'Compass',
    description: 'Laser-guided 4-wheel alignment, tire rotation, suspension geometry check, and steering wheel centering.',
    features: ['Laser Wheel Alignment', 'Tire Pressure Balancing', 'Suspension Check', 'Road Performance Test']
  },
  {
    id: 'srv-6',
    title: 'Transmission Fluid Flush & Service',
    category: 'Drivetrain',
    price: 189.00,
    estimated_time: '1.5 Hours',
    icon_name: 'Settings',
    description: 'Complete transmission oil flush, pan gasket replacement, magnet cleaning, and shift timing test.',
    features: ['Transmission Flush', 'Pan Gasket Replacement', 'Filter Renewal', 'Shift Calibration']
  }
];

export const MOCK_CUSTOMERS = [
  { id: 'c-101', full_name: 'Alexander Wright', email: 'alex.wright@example.com', phone: '+1 (555) 234-5678', address: '742 Evergreen Terrace, Springfield' },
  { id: 'c-102', full_name: 'Sophia Martinez', email: 'sophia.m@example.com', phone: '+1 (555) 876-5432', address: '1204 Pine Crest Ave, Seattle, WA' },
  { id: 'c-103', full_name: 'Marcus Vance', email: 'marcus.vance@example.com', phone: '+1 (555) 345-6789', address: '55 Ocean Drive, Miami, FL' },
  { id: 'c-104', full_name: 'Elena Rostova', email: 'elena.r@example.com', phone: '+1 (555) 901-2345', address: '88 Tech Boulevard, Austin, TX' }
];

export const MOCK_VEHICLES = [
  {
    id: 'v-201',
    customer_id: 'c-101',
    customer_name: 'Alexander Wright',
    make: 'BMW',
    model: 'M3 Competition',
    year: 2023,
    vin: 'WBS33AY05PFP12345',
    license_plate: 'AUT-8899',
    mileage: 18450,
    color: 'Isle of Man Green'
  },
  {
    id: 'v-202',
    customer_id: 'c-102',
    customer_name: 'Sophia Martinez',
    make: 'Tesla',
    model: 'Model Y Long Range',
    year: 2022,
    vin: '5YJYGDEE8NF987654',
    license_plate: 'EV-302-GO',
    mileage: 31200,
    color: 'Pearl White'
  },
  {
    id: 'v-203',
    customer_id: 'c-103',
    customer_name: 'Marcus Vance',
    make: 'Ford',
    model: 'F-150 Lightning',
    year: 2024,
    vin: '1FTVW1EV4PW654321',
    license_plate: 'TRK-9045',
    mileage: 9100,
    color: 'Antimatter Blue'
  },
  {
    id: 'v-204',
    customer_id: 'c-104',
    customer_name: 'Elena Rostova',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2021,
    vin: 'WP0AA2A92MS214365',
    license_plate: '911-SPEED',
    mileage: 24800,
    color: 'GT Silver Metallic'
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 'apt-301',
    customer_name: 'Alexander Wright',
    customer_email: 'alex.wright@example.com',
    customer_phone: '+1 (555) 234-5678',
    vehicle_make: 'BMW',
    vehicle_model: 'M3 Competition',
    license_plate: 'AUT-8899',
    vin: 'WBS33AY05PFP12345',
    service_type: 'Full Synthetic Oil & Filter Change',
    appointment_date: '2026-10-09',
    appointment_time: '10:00 AM',
    status: 'In Progress',
    notes: 'Customer requested synthetic 0W-30 liquid state check.'
  },
  {
    id: 'apt-302',
    customer_name: 'Sophia Martinez',
    customer_email: 'sophia.m@example.com',
    customer_phone: '+1 (555) 876-5432',
    vehicle_make: 'Tesla',
    vehicle_model: 'Model Y',
    license_plate: 'EV-302-GO',
    vin: '5YJYGDEE8NF987654',
    service_type: 'AC Climate System Service',
    appointment_date: '2026-10-09',
    appointment_time: '02:30 PM',
    status: 'Confirmed',
    notes: 'Replace HEPA cabin air filter.'
  },
  {
    id: 'apt-303',
    customer_name: 'Marcus Vance',
    customer_email: 'marcus.vance@example.com',
    customer_phone: '+1 (555) 345-6789',
    vehicle_make: 'Ford',
    vehicle_model: 'F-150 Lightning',
    license_plate: 'TRK-9045',
    vin: '1FTVW1EV4PW654321',
    service_type: '4-Wheel Precision Alignment',
    appointment_date: '2026-10-10',
    appointment_time: '09:15 AM',
    status: 'Scheduled',
    notes: 'Slight pulling towards right at 60 mph.'
  },
  {
    id: 'apt-304',
    customer_name: 'Elena Rostova',
    customer_email: 'elena.r@example.com',
    customer_phone: '+1 (555) 901-2345',
    vehicle_make: 'Porsche',
    vehicle_model: '911 Carrera S',
    license_plate: '911-SPEED',
    vin: 'WP0AA2A92MS214365',
    service_type: 'Brake System Overhaul',
    appointment_date: '2026-10-08',
    appointment_time: '01:00 PM',
    status: 'Completed',
    notes: 'Track day prep. Upgrade to ceramic brake pads.'
  }
];

export const MOCK_WORK_ORDERS = [
  {
    id: 'wo-401',
    appointment_id: 'apt-301',
    vehicle_vin: 'WBS33AY05PFP12345',
    license_plate: 'AUT-8899',
    vehicle_details: 'BMW M3 Competition (2023)',
    customer_name: 'Alexander Wright',
    mechanic_assigned: 'Dave Miller (Master Tech)',
    stage: 'In Repair',
    estimated_completion: 'Today, 03:00 PM',
    labor_hours: 1.5,
    labor_rate: 85.00,
    parts_list: [
      { name: 'Motul 300V Synthetic Oil (7L)', quantity: 1, unit_price: 110.00 },
      { name: 'OEM BMW Oil Filter Element', quantity: 1, unit_price: 28.50 },
      { name: 'Sump Plug Washer', quantity: 1, unit_price: 3.00 }
    ],
    notes: 'Engine diagnostics clear. Replaced oil filter housing seal.'
  },
  {
    id: 'wo-402',
    appointment_id: 'apt-304',
    vehicle_vin: 'WP0AA2A92MS214365',
    license_plate: '911-SPEED',
    vehicle_details: 'Porsche 911 Carrera S (2021)',
    customer_name: 'Elena Rostova',
    mechanic_assigned: 'Carlos Mendez (Brake Specialist)',
    stage: 'Ready for Pickup',
    estimated_completion: 'Completed',
    labor_hours: 2.0,
    labor_rate: 95.00,
    parts_list: [
      { name: 'PFC Ceramic Front Brake Pads', quantity: 1, unit_price: 210.00 },
      { name: 'PFC Ceramic Rear Brake Pads', quantity: 1, unit_price: 185.00 },
      { name: 'Castrol React SRF Brake Fluid (1L)', quantity: 2, unit_price: 45.00 }
    ],
    notes: 'Brake pads bedded in. Fluid flushed and pressure tested.'
  },
  {
    id: 'wo-403',
    appointment_id: 'apt-302',
    vehicle_vin: '5YJYGDEE8NF987654',
    license_plate: 'EV-302-GO',
    vehicle_details: 'Tesla Model Y (2022)',
    customer_name: 'Sophia Martinez',
    mechanic_assigned: 'Sarah Chen (EV Specialist)',
    stage: 'In Queue',
    estimated_completion: 'Tomorrow, 11:30 AM',
    labor_hours: 1.0,
    labor_rate: 80.00,
    parts_list: [
      { name: 'OEM Tesla Bioweapon Defense Filter', quantity: 1, unit_price: 75.00 },
      { name: 'AC Sanitizer Mist', quantity: 1, unit_price: 24.00 }
    ],
    notes: 'Vehicle arrived at bay 4.'
  }
];

export const MOCK_INVOICES = [
  {
    id: 'inv-501',
    invoice_number: 'INV-2026-0891',
    work_order_id: 'wo-402',
    customer_name: 'Elena Rostova',
    customer_email: 'elena.r@example.com',
    vehicle_details: '2021 Porsche 911 Carrera S',
    license_plate: '911-SPEED',
    issue_date: '2026-10-08',
    due_date: '2026-10-22',
    payment_status: 'Paid',
    payment_method: 'Credit Card (Visa **** 4490)',
    subtotal: 675.00,
    tax_amount: 54.00,
    discount_amount: 25.00,
    total_amount: 704.00,
    items: [
      { description: 'PFC Ceramic Brake Pads (Front & Rear)', category: 'Parts', amount: 395.00 },
      { description: 'Castrol React SRF Racing Brake Fluid', category: 'Parts', amount: 90.00 },
      { description: 'Brake System Overhaul Labor (2.0 hrs @ $95/hr)', category: 'Labor', amount: 190.00 }
    ]
  },
  {
    id: 'inv-502',
    invoice_number: 'INV-2026-0892',
    work_order_id: 'wo-401',
    customer_name: 'Alexander Wright',
    customer_email: 'alex.wright@example.com',
    vehicle_details: '2023 BMW M3 Competition',
    license_plate: 'AUT-8899',
    issue_date: '2026-10-08',
    due_date: '2026-10-22',
    payment_status: 'Pending',
    payment_method: 'Awaiting Payment',
    subtotal: 269.00,
    tax_amount: 21.52,
    discount_amount: 0.00,
    total_amount: 290.52,
    items: [
      { description: 'Motul 300V Synthetic Oil & OEM Filter Kit', category: 'Parts', amount: 141.50 },
      { description: 'Full Synthetic Oil Change Labor (1.5 hrs @ $85/hr)', category: 'Labor', amount: 127.50 }
    ]
  }
];

export const DEMO_ACCOUNTS = [
  { role: 'Admin', email: 'admin@autocare.com', password: 'password123', name: 'James Carter (Station Manager)' },
  { role: 'Service Advisor', email: 'advisor@autocare.com', password: 'password123', name: 'Robert Vance (Lead Advisor)' },
  { role: 'Customer', email: 'alex.wright@example.com', password: 'password123', name: 'Alexander Wright' }
];
