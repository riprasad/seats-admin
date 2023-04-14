import {ComplianceScreeningResponse} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createComplianceScreeningResponseFromDiscriminatorValue(parseNode: ParseNode | undefined) : ComplianceScreeningResponse {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ComplianceScreeningResponse();
}
