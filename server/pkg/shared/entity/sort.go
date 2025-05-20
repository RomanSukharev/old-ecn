package shared_entity

type sort map[string]interface{}

type SortOrder string

const (
	SortOrderAsc  SortOrder = "ASC"
	SortOrderDesc SortOrder = "DESC"
)

type sortOptions func(s *sort) error

func NewSort(args ...sortOptions) (*sort, error) {
	s := &sort{}
	for _, cfg := range args {
		err := cfg(s)
		if err != nil {
			return nil, err
		}
	}
	return s, nil
}

func WithSortField(field string, order SortOrder) sortOptions {
	return func(s *sort) error {
		(*s)[field] = order
		return nil
	}
}
