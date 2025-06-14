-- Scheduled Rituals Table
CREATE TABLE scheduled_rituals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ritual_id UUID NOT NULL REFERENCES rituals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    repeat_interval TEXT CHECK (repeat_interval IN ('none', 'daily', 'weekly', 'monthly')) DEFAULT 'none',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trigger to auto-update updated_at on updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_scheduled_rituals_updated_at
BEFORE UPDATE ON scheduled_rituals
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
