def switchSort(queryset, sort):
    if sort == 'PRIORITY_HTL':
        queryset = queryset.order_by('priority')           
    elif sort == 'PRIORITY_LTH':
        queryset = queryset.order_by('-priority')
    elif sort == 'DEADLINE_DESC':
        queryset = queryset.order_by('-deadline')
    elif sort == 'DEADLINE_ASC':
        queryset = queryset.order_by('deadline')
    elif sort == 'PUBL_DESC':
        queryset = queryset.order_by('-date')
    elif sort == 'UPDT_DESC':
        queryset = queryset.order_by('-updated')
    elif sort == 'UPDT_ASC': 
        queryset = queryset.order_by('updated')
    return queryset