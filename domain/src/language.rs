#[derive(Debug, PartialEq)]
pub enum Language {
    English,
    Portuguese,
    Spanish,
}

impl Language {
    pub fn from_iso_639_1(lg: &str) -> Self {
        if lg == "en" || lg.starts_with("en-") {
            return Language::English;
        }
        if lg == "es" || lg.starts_with("es-") {
            return Language::Spanish;
        }
        if lg == "pt" || lg.starts_with("pt-") {
            return Language::Portuguese;
        }
        Language::English
    }

    pub fn to_iso_639_1(&self) -> &'static str {
        match self {
            Language::English => "en",
            &Language::Portuguese => "pt",
            Language::Spanish => "es",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::Language;

    #[test]
    fn from_iso_639_1() {
        assert_eq!(Language::from_iso_639_1("en"), Language::English);
        assert_eq!(Language::from_iso_639_1("pt"), Language::Portuguese);
        assert_eq!(Language::from_iso_639_1("es"), Language::Spanish);
        assert_eq!(Language::from_iso_639_1("en-US"), Language::English);
        assert_eq!(Language::from_iso_639_1("pt-BR"), Language::Portuguese);
        assert_eq!(Language::from_iso_639_1("es-AR"), Language::Spanish);
    }

    #[test]
    fn to_iso_639_1() {
        assert_eq!(Language::English.to_iso_639_1(), "en");
        assert_eq!(Language::Portuguese.to_iso_639_1(), "pt");
        assert_eq!(Language::Spanish.to_iso_639_1(), "es");
    }
}
