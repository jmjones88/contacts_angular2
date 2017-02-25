//Definition of a contact item
export class Contact {
    public isChecked: Boolean;
    constructor(
        public type: String,
        public name: String,
        public title: String,
        public phone: String,
        public ext: String,
        public fax: String,
        public email: String
    ){}
}
