import {createComplianceScreeningErrorResponse_errorsFromDiscriminatorValue} from './createComplianceScreeningErrorResponse_errorsFromDiscriminatorValue';
import {ComplianceScreeningErrorResponse_errors} from './index';
import {AdditionalDataHolder, ApiError, Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class ComplianceScreeningErrorResponse extends ApiError implements AdditionalDataHolder, Parsable {
    /** Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well. */
    private _additionalData: Record<string, unknown>;
    /** The errors property */
    private _errors?: ComplianceScreeningErrorResponse_errors[] | undefined;
    /**
     * Gets the additionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @returns a Record<string, unknown>
     */
    public get additionalData() {
        return this._additionalData;
    };
    /**
     * Sets the additionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @param value Value to set for the AdditionalData property.
     */
    public set additionalData(value: Record<string, unknown>) {
        this._additionalData = value;
    };
    /**
     * Instantiates a new ComplianceScreeningErrorResponse and sets the default values.
     */
    public constructor() {
        super();
        this._additionalData = {};
    };
    /**
     * Gets the errors property value. The errors property
     * @returns a ComplianceScreeningErrorResponse_errors
     */
    public get errors() {
        return this._errors;
    };
    /**
     * Sets the errors property value. The errors property
     * @param value Value to set for the errors property.
     */
    public set errors(value: ComplianceScreeningErrorResponse_errors[] | undefined) {
        this._errors = value;
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "errors": n => { this.errors = n.getCollectionOfObjectValues<ComplianceScreeningErrorResponse_errors>(createComplianceScreeningErrorResponse_errorsFromDiscriminatorValue); },
        };
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeCollectionOfObjectValues<ComplianceScreeningErrorResponse_errors>("errors", this.errors);
        writer.writeAdditionalData(this.additionalData);
    };
}
