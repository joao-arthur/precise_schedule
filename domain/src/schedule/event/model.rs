#[derive(Debug, PartialEq, Clone)]
pub enum EventCategory {
    Appointment,
    Birthday,
    Date,
    Meeting,
    Party,
    Travel,
}

#[derive(Debug, PartialEq, Clone)]
pub enum EventFrequency {
    D1,
    D2,
    W1,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

impl EventFrequency {
    pub fn parse(frequency: &str) -> Option<EventFrequency> {
        match frequency {
            "1D" => Some(EventFrequency::D1),
            "2D" => Some(EventFrequency::D2),
            "1W" => Some(EventFrequency::W1),
            "1M" => Some(EventFrequency::M1),
            "3M" => Some(EventFrequency::M3),
            "6M" => Some(EventFrequency::M6),
            "1Y" => Some(EventFrequency::Y1),
            "2Y" => Some(EventFrequency::Y2),
            _ => None,
        }
    }
}

#[derive(Debug, PartialEq, Clone)]
pub struct Event {
    pub id: String,
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
    pub user: String,
    pub created_at: String,
    pub updated_at: String,
}

#[cfg(test)]
mod test {
    use super::EventFrequency;

    #[test]
    fn test_event_frequency_parse() {
        assert_eq!(EventFrequency::parse("365D"), None);
        assert_eq!(EventFrequency::parse("1D"), Some(EventFrequency::D1));
        assert_eq!(EventFrequency::parse("2D"), Some(EventFrequency::D2));
        assert_eq!(EventFrequency::parse("1W"), Some(EventFrequency::W1));
        assert_eq!(EventFrequency::parse("1M"), Some(EventFrequency::M1));
        assert_eq!(EventFrequency::parse("3M"), Some(EventFrequency::M3));
        assert_eq!(EventFrequency::parse("6M"), Some(EventFrequency::M6));
        assert_eq!(EventFrequency::parse("1Y"), Some(EventFrequency::Y1));
        assert_eq!(EventFrequency::parse("2Y"), Some(EventFrequency::Y2));
    }
}
