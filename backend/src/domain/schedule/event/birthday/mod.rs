use crate::domain::validation::*;
use std::collections::HashMap;

fn build_create_schema() -> Schema<'static> {
    HashMap::from([(
        "name",
        vec![
            Valid::Reqd(ReqdValid()),
            Valid::Str(StrValid()),
            Valid::StrMinLen(StrMinLenValid { value: 1 }),
            Valid::StrMaxLen(StrMaxLenValid { value: 32 }),
        ],
    )])
}

//import type { Schema } from "../../../../validation/schema.ts";
//import type { BirthdayUpdateModel } from "./model.ts";
//
//export const updateBirthdayValidation: Schema<BirthdayUpdateModel> = {
//    name: [
//        { type: "str" },
//        { type: "strMinLen", min: 1 },
//        { type: "strMaxLen", max: 32 },
//    ],
//    day: [
//        { type: "dt" },
//        { type: "dtMin", min: "1970-01-01" },
//    ],
//};
//
