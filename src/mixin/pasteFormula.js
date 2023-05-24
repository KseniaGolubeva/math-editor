import {bus} from "@/main";

const event = 'paste-formula';

export const PasteFormula = {
    methods: {
        pasteFormula(formula) {
            bus.$emit(event, '$$' + formula + '$$');
        }
    }
}