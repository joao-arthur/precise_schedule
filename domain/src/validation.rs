
use araucaria::{error::ErrWrap, validation::Validation, value::Value};

pub trait Validator {
    fn validate(&self, validation: &Validation, value: &Value) -> Result<(), ErrWrap>;
}

pub mod stub {
    use super::*;

    pub struct ValidatorStub(pub Result<(), ErrWrap>);

    impl Validator for ValidatorStub {
        fn validate(&self, _validation: &Validation, _value: &Value) -> Result<(), ErrWrap> {
            self.0.clone()
        }
    }

    #[cfg(test)]
    mod test {
        use std::collections::HashMap;

        use araucaria::{error::Err, validation::{bool::BoolValidation, ObjValidation}};

        use super::*;

        #[test]
        fn test_validator_stub() {
            assert_eq!(
                ValidatorStub(Ok(())).validate(
                    &Validation::Obj(ObjValidation {
                        validation: HashMap::from([(
                            "is",
                            Validation::Bool(BoolValidation::default().required().eq(false))
                        )]),
                        required: false
                    }),
                    &Value::Obj(HashMap::from([(String::from("is"), Value::Bool(false))]))
                ),
                Ok(())
            );
            assert_eq!(
                ValidatorStub(Err(ErrWrap::Obj(HashMap::from([(
                    String::from("is"),
                    ErrWrap::Arr(vec![Err::Bool, Err::Required, Err::Eq(Value::Bool(false))])
                )])))).validate(
                    &Validation::Obj(ObjValidation {
                        validation: HashMap::from([(
                            "is",
                            Validation::Bool(BoolValidation::default().required().eq(false))
                        )]),
                        required: false
                    }),
                    &Value::None
                ),
                Err(ErrWrap::Obj(HashMap::from([(
                    String::from("is"),
                    ErrWrap::Arr(vec![Err::Bool, Err::Required, Err::Eq(Value::Bool(false))])
                )])))
            );
        }
    }
}
