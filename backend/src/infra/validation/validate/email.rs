use crate::domain::validation::{EmailErr, Value};

pub fn email(value: &Value) -> Result<(), EmailErr> {
    match value {
        Value::Str(str_value) => {
            if str_value.chars().any(|c| c.is_whitespace()) {
                return Err(EmailErr);
            }
            let parts: Vec<&str> = str_value.split('@').collect();
            if parts.len() != 2 {
                return Err(EmailErr);
            }
            let local_part = parts[0];
            let domain_part = parts[1];
            if local_part.is_empty() || domain_part.is_empty() {
                return Err(EmailErr);
            }
            let domain_parts: Vec<&str> = domain_part.split('.').collect();
            if domain_parts.len() < 2 || domain_parts.iter().any(|part| part.is_empty()) {
                return Err(EmailErr);
            }
            Ok(())
        }
        _ => Ok(()),
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_email_ok() {
        assert_eq!(email(&Value::Absent), Ok(()));
        assert_eq!(email(&Value::Str(String::from("john.lennon@gmail.com"))), Ok(()));
        assert_eq!(email(&Value::Str(String::from("paul_macca@hotmail.com"))), Ok(()));
        assert_eq!(email(&Value::Str(String::from("ringo-starr@outlook.com"))), Ok(()));
        assert_eq!(email(&Value::Str(String::from("GeorgeHarrison@live.com"))), Ok(()));
    }

    #[test]
    fn test_email_err() {
        assert_eq!(email(&Value::Str(String::from("paullivecom"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("paul@livecom"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("paullive.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("paul@liv@e.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("live.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("@live.com"))), Err(EmailErr));
    }
}
