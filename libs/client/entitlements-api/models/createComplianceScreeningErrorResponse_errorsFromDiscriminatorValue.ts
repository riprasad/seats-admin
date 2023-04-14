import {ComplianceScreeningErrorResponse_errors} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createComplianceScreeningErrorResponse_errorsFromDiscriminatorValue(parseNode: ParseNode | undefined) : ComplianceScreeningErrorResponse_errors {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ComplianceScreeningErrorResponse_errors();
}
