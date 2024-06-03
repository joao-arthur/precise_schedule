use crate::domain::generator::id::service::IdGenerator;

pub struct IdGeneratorStub {
    value: String,
}

impl IdGeneratorStub {
    pub fn new(value: String) -> Self {
        IdGeneratorStub { value }
    }
}

impl IdGenerator for IdGeneratorStub {
    fn generate(&self) -> String {
        self.value.clone()
    }
}

#[cfg(test)]
mod test {
    use crate::domain::generator::id::stub::IdGeneratorStub;
    use crate::domain::generator::id::service::IdGenerator;

    #[test]
    fn test_stub() {
        let id_generator_stub = IdGeneratorStub::new(String::from("example"));
        let generated_id = id_generator_stub.generate();
        assert_eq!(generated_id, String::from("example"));
    }
}