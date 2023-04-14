import {ListSeatsResponsePagination} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createListSeatsResponsePaginationFromDiscriminatorValue(parseNode: ParseNode | undefined) : ListSeatsResponsePagination {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ListSeatsResponsePagination();
}
