import {ComplianceScreeningErrorResponse} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createComplianceScreeningErrorResponseFromDiscriminatorValue(parseNode: ParseNode | undefined) : ComplianceScreeningErrorResponse {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ComplianceScreeningErrorResponse();
}
