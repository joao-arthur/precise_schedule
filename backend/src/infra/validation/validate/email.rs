use email_address::EmailAddress;

use crate::domain::validation::{EmailErr, Value};

pub fn email(value: &Value) -> Result<(), EmailErr> {
    match value {
        Value::Str(str_value) => {
            if EmailAddress::is_valid(str_value) {
                Ok(())
            } else {
                Err(EmailErr)
            }
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
        assert_eq!(email(&Value::Str(String::from("paullive.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("paul@liv@e.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("live.com"))), Err(EmailErr));
        assert_eq!(email(&Value::Str(String::from("@live.com"))), Err(EmailErr));
    }
}
