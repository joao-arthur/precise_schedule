use email_address::EmailAddress;

use crate::{
    domain::validation::{EmailErr, Val},
    infra::validation::Field,
};

pub fn email(f: &Field) -> Result<(), EmailErr> {
    match &f.value {
        Val::Str(str_value) => {
            if EmailAddress::is_valid(str_value) {
                Ok(())
            } else {
                Err(EmailErr(f.name))
            }
        }
        Val::None => {
            if f.has_required {
                Err(EmailErr(f.name))
            } else {
                Ok(())
            }
        }
        _ => Err(EmailErr(f.name)),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::f_obj_stub;

    use super::*;

    #[test]
    fn test_email_ok() {
        assert_eq!(email(&Field::of(Val::Str(String::from("john.lennon@gmail.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("paul_macca@hotmail.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("ringo-starr@outlook.com")))), Ok(()));
        assert_eq!(email(&Field::of(Val::Str(String::from("GeorgeHarrison@live.com")))), Ok(()));
    }

    #[test]
    fn test_email_err() {
        assert_eq!(email(&Field::of(Val::Str(String::from("paullivecom")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("paullive.com")))), Err(EmailErr("foo")));
        assert_eq!(
            email(&Field::of(Val::Str(String::from("paul@liv@e.com")))),
            Err(EmailErr("foo"))
        );
        assert_eq!(email(&Field::of(Val::Str(String::from("live.com")))), Err(EmailErr("foo")));
        assert_eq!(email(&Field::of(Val::Str(String::from("@live.com")))), Err(EmailErr("foo")));
    }

    #[test]
    fn test_wrong_type_err() {
        assert_eq!(email(&f_obj_stub()), Err(EmailErr("foo")));
    }

    #[test]
    fn test_none_not_required() {
        assert_eq!(email(&Field::default()), Ok(()));
    }

    #[test]
    fn test_none_required() {
        assert_eq!(email(&Field::required()), Err(EmailErr("foo")));
    }
}
