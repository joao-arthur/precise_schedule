pub trait IdGenerator {
    fn generate(&self) -> String;
}

pub struct IdGeneratorStub(String);

impl IdGenerator for IdGeneratorStub {
    fn generate(&self) -> String {
        self.0.clone()
    }
}

#[cfg(test)]
mod id_generator_test {
    use super::*;

    #[test]
    fn test_stub() {
        let id_generator_stub = IdGeneratorStub(String::from("example"));
        let generated_id = id_generator_stub.generate();
        assert_eq!(generated_id, String::from("example"));
    }
}
