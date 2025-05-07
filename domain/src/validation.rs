use araucaria::{error::SchemaErr, schema::Schema, value::Value};

pub trait Validator {
    fn validate(&self, validation: &Schema, value: &Value) -> Result<(), SchemaErr>;
}

pub mod stub {
    use araucaria::{error::SchemaErr, schema::Schema, value::Value};

    use super::Validator;

    pub struct ValidatorStub(pub Result<(), SchemaErr>);

    impl Validator for ValidatorStub {
        fn validate(&self, _validation: &Schema, _value: &Value) -> Result<(), SchemaErr> {
            self.0.clone()
        }
    }

    #[cfg(test)]
    mod tests {
        use araucaria::{
            error::{SchemaErr, ValidationErr},
            operation::{Operand, OperandValue, Operation},
            schema::{BoolSchema, ObjSchema, Schema},
            value::Value,
        };

        use super::{Validator, ValidatorStub};

        const REQUIRED: ValidationErr = ValidationErr::Required;
        const BOOL: ValidationErr = ValidationErr::Bool;

        #[test]
        fn validator_stub() {
            let v = Schema::from(ObjSchema::from([("is".into(), Schema::Bool(BoolSchema::default().eq(false)))]).optional());
            let value = Value::from([("is".into(), Value::Bool(false))]);
            let err = SchemaErr::from([(
                "is".into(),
                SchemaErr::from([REQUIRED, BOOL, ValidationErr::Operation(Operation::Eq(Operand::Value(OperandValue::Bool(false))))]),
            )]);
            assert_eq!(ValidatorStub(Ok(())).validate(&v, &value), Ok(()));
            assert_eq!(ValidatorStub(Err(err.clone())).validate(&v, &Value::None), Err(err.clone()));
        }
    }
}
