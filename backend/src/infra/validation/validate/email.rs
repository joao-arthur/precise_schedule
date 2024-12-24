use email_address::EmailAddress;

use crate::{
    domain::validation::{Val, V},
    infra::validation::Field,
};

pub fn email(f: &Field) -> Result<(), V> {
    match &f.value {
        Val::Str(str_value) => {
            if EmailAddress::is_valid(str_value) {
                Ok(())
            } else {
                Err(V::Email)
            }
        }
        Val::None => {
            if !f.has_required {
                Ok(())
            } else {
                Err(V::Email)
            }
        }
        _ => Err(V::Email),
    }
}

#[cfg(test)]
mod test {
    use crate::infra::validation::validate::stub::{
        f_arr_stub, f_bool_stub, f_num_f_stub, f_num_i_stub, f_num_u_stub, f_obj_stub,
    };

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
        assert_eq!(email(&Field::of(Val::Str(String::from("paullivecom")))), Err(V::Email));
        assert_eq!(email(&Field::of(Val::Str(String::from("paullive.com")))), Err(V::Email));
        assert_eq!(email(&Field::of(Val::Str(String::from("paul@liv@e.com")))), Err(V::Email));
        assert_eq!(email(&Field::of(Val::Str(String::from("live.com")))), Err(V::Email));
        assert_eq!(email(&Field::of(Val::Str(String::from("@live.com")))), Err(V::Email));
    }

    #[test]
    fn test_email_type_err() {
        assert_eq!(email(&f_num_u_stub()), Err(V::Email));
        assert_eq!(email(&f_num_i_stub()), Err(V::Email));
        assert_eq!(email(&f_num_f_stub()), Err(V::Email));
        assert_eq!(email(&f_bool_stub()), Err(V::Email));
        assert_eq!(email(&f_arr_stub()), Err(V::Email));
        assert_eq!(email(&f_obj_stub()), Err(V::Email));
    }

    #[test]
    fn test_email_required() {
        assert_eq!(email(&Field::default()), Ok(()));
        assert_eq!(email(&Field::required()), Err(V::Email));
    }
}
