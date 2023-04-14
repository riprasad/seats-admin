import {ListPagination} from './index';
import {ParseNode} from '@microsoft/kiota-abstractions';

export function createListPaginationFromDiscriminatorValue(parseNode: ParseNode | undefined) : ListPagination {
    if(!parseNode) throw new Error("parseNode cannot be undefined");
    return new ListPagination();
}
