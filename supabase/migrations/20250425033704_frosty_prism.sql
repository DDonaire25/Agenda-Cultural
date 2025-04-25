/*
  # Create Cultural Management Tables

  1. New Tables
    - `cultural_events`
      - Event details including title, date, location, type, etc.
      - Cost information and responsible person details
      - Technical requirements and image support
    - `artist_birthdays` 
      - Artist birthday tracking with contact info
      - Professional details and trajectory
    - `cultural_tasks`
      - Task management with status and priority
      - Checklist support and assignment tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
    - Only allow users to access their own data

  3. Indexes
    - Optimize common queries with appropriate indexes
    - Support efficient date-based lookups
*/

-- Create cultural_events table
CREATE TABLE cultural_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  location_url text,
  event_type text NOT NULL,
  discipline text NOT NULL,
  category text NOT NULL,
  target_audience text NOT NULL,
  cost_type text NOT NULL CHECK (cost_type IN ('free', 'paid')),
  cost_amount decimal,
  responsible_person jsonb NOT NULL,
  technical_requirements text[] DEFAULT '{}',
  image_url text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT proper_title CHECK (char_length(title) >= 3)
);

-- Create artist_birthdays table
CREATE TABLE artist_birthdays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  birth_date date NOT NULL,
  role text NOT NULL,
  discipline text NOT NULL,
  trajectory text NOT NULL,
  contact_info jsonb NOT NULL,
  image_url text,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT proper_name CHECK (char_length(name) >= 2)
);

-- Create cultural_tasks table
CREATE TABLE cultural_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  priority text NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to text NOT NULL,
  due_date timestamptz NOT NULL,
  checklist jsonb[] DEFAULT '{}',
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT proper_title CHECK (char_length(title) >= 3)
);

-- Enable Row Level Security
ALTER TABLE cultural_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_birthdays ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for cultural_events
CREATE POLICY "Users can view their own events"
  ON cultural_events
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create events"
  ON cultural_events
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
  ON cultural_events
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
  ON cultural_events
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for artist_birthdays
CREATE POLICY "Users can view their own birthdays"
  ON artist_birthdays
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create birthdays"
  ON artist_birthdays
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own birthdays"
  ON artist_birthdays
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own birthdays"
  ON artist_birthdays
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for cultural_tasks
CREATE POLICY "Users can view their own tasks"
  ON cultural_tasks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tasks"
  ON cultural_tasks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON cultural_tasks
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON cultural_tasks
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX cultural_events_user_date_idx ON cultural_events(user_id, date);
CREATE INDEX cultural_events_category_idx ON cultural_events(category);
CREATE INDEX artist_birthdays_user_date_idx ON artist_birthdays(user_id, birth_date);
CREATE INDEX cultural_tasks_user_status_idx ON cultural_tasks(user_id, status);
CREATE INDEX cultural_tasks_due_date_idx ON cultural_tasks(due_date);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cultural_events_updated_at
  BEFORE UPDATE ON cultural_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artist_birthdays_updated_at
  BEFORE UPDATE ON artist_birthdays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cultural_tasks_updated_at
  BEFORE UPDATE ON cultural_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();