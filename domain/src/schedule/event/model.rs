#[derive(Debug, PartialEq, Clone)]
pub enum EventCat {
    Appointment,
    Birthday,
    Date,
    Meeting,
    Party,
    Travel,
}

#[derive(Debug, PartialEq, Clone)]
pub enum EventFreq {
    D1,
    D2,
    W1,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

impl EventFreq {
    pub fn parse(frequency: &str) -> Option<EventFreq> {
        match frequency {
            "1D" => Some(EventFreq::D1),
            "2D" => Some(EventFreq::D2),
            "1W" => Some(EventFreq::W1),
            "1M" => Some(EventFreq::M1),
            "3M" => Some(EventFreq::M3),
            "6M" => Some(EventFreq::M6),
            "1Y" => Some(EventFreq::Y1),
            "2Y" => Some(EventFreq::Y2),
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
    pub category: EventCat,
    pub frequency: Option<EventFreq>,
    pub weekend_repeat: Option<bool>,
    pub user: String,
    pub created_at: String,
    pub updated_at: String,
}

#[cfg(test)]
mod test {
    use super::EventFreq;

    #[test]
    fn test_event_frequency_parse() {
        assert_eq!(EventFreq::parse("365D"), None);
        assert_eq!(EventFreq::parse("1D"), Some(EventFreq::D1));
        assert_eq!(EventFreq::parse("2D"), Some(EventFreq::D2));
        assert_eq!(EventFreq::parse("1W"), Some(EventFreq::W1));
        assert_eq!(EventFreq::parse("1M"), Some(EventFreq::M1));
        assert_eq!(EventFreq::parse("3M"), Some(EventFreq::M3));
        assert_eq!(EventFreq::parse("6M"), Some(EventFreq::M6));
        assert_eq!(EventFreq::parse("1Y"), Some(EventFreq::Y1));
        assert_eq!(EventFreq::parse("2Y"), Some(EventFreq::Y2));
    }
}
