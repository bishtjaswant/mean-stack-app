import mongoosse from 'mongoose';

const issuseSchema = new mongoosse.Schema({
    issue: { type: String, required: true },
    responsible: { type: String, required: true },
    descriptions: { type: String },
    severity: { type: String },
    status: {type: String, default: 'open'},
});

export default mongoosse.model('issues', issuseSchema, 'issues');