-- Vehicle Service Management System SQL Schema for Supabase

-- 1. Services Catalog Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    estimated_time VARCHAR(50) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'Wrench',
    features TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    vin VARCHAR(50) UNIQUE NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    mileage INT NOT NULL,
    color VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    vehicle_make VARCHAR(100) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    vin VARCHAR(50),
    service_type VARCHAR(255) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled', -- Scheduled, Confirmed, In Progress, Completed, Cancelled
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Work Orders (Job Cards) Table
CREATE TABLE IF NOT EXISTS public.work_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    vehicle_vin VARCHAR(50) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    mechanic_assigned VARCHAR(255) DEFAULT 'Unassigned',
    stage VARCHAR(50) DEFAULT 'In Queue', -- In Queue, Diagnostics, In Repair, Final Inspection, Ready for Pickup, Delivered
    estimated_completion TIMESTAMP WITH TIME ZONE,
    parts_list JSONB DEFAULT '[]'::jsonb,
    labor_hours NUMERIC(5, 2) DEFAULT 0,
    labor_rate NUMERIC(10, 2) DEFAULT 75.00,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    work_order_id UUID REFERENCES public.work_orders(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    vehicle_details VARCHAR(255) NOT NULL,
    license_plate VARCHAR(50) NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    tax_amount NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Pending', -- Paid, Pending, Overdue
    payment_method VARCHAR(50),
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE DEFAULT (CURRENT_DATE + INTERVAL '14 days'),
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and default public access policies
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow all access to appointments" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Allow all access to work_orders" ON public.work_orders FOR ALL USING (true);
CREATE POLICY "Allow all access to invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Allow all access to customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow all access to vehicles" ON public.vehicles FOR ALL USING (true);

-- Seed Data: Sample Services
INSERT INTO public.services (title, category, price, estimated_time, description, icon_name, features) VALUES
('Full Synthetic Oil & Filter Change', 'Maintenance', 89.99, '45 Mins', 'Complete engine flush, premium synthetic oil change, filter replacement, and 21-point safety inspection.', 'Wrench', ARRAY['Engine Flush', '21-Point Inspection', 'Fluid Top-off', 'Filter Replacement']),
('Brake System Overhaul', 'Safety & Brakes', 249.50, '2 Hours', 'Front and rear brake pad replacement, rotor resurfacing/replacement, brake line bleeding and fluid flush.', 'Disc', ARRAY['Ceramic Brake Pads', 'Rotor Inspection & Resurfacing', 'Brake Fluid Bleed', 'Caliper Test']),
('Advanced Computer Diagnostics', 'Diagnostics', 65.00, '30 Mins', 'Full OBD-II sensor scan, ECU fault code analysis, electrical system check, and digital report generation.', 'Cpu', ARRAY['OBD-II Scan', 'Live Sensor Data', 'Battery & Alternator Test', 'Fault Report']),
('AC Climate System Service', 'Comfort', 129.00, '1 Hour', 'Refrigerant pressure check, AC leak detection, evaporator coil cleaning, and cabin air filter renewal.', 'Wind', ARRAY['R134a/R1234yf Recharge', 'Leak Detection Test', 'Cabin Filter Renewal', 'Temperature Calibration']),
('4-Wheel Precision Alignment', 'Tires & Steering', 119.99, '1 Hour', 'Laser-guided 4-wheel alignment, tire rotation, suspension geometry check, and steering wheel centering.', 'Compass', ARRAY['Laser Alignment', 'Tire Pressure Balancing', 'Suspension Check', 'Road Test']);
