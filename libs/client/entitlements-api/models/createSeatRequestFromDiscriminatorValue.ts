import {SeatRequest} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createSeatRequestFromDiscriminatorValue(parseNode: ParseNode | undefined) : SeatRequest {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new SeatRequest();
}
