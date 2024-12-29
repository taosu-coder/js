import { Ac } from "./A.js";
import { Bc } from "./B.js";
Ac()
Bc()

function C() {
    console.log(Ac, "33")
    console.log(Bc, "33")
}
C()
export { C }