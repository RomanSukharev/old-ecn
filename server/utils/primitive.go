package utils

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ObjectIDFromString(ptr *string) (*primitive.ObjectID, error) {
	if ptr != nil && *ptr != "" {
		eid, err := primitive.ObjectIDFromHex(*ptr)
		if err != nil {
			return nil, err
		}
		return &eid, nil
	}

	return nil, errors.New("missing ptr")
}

func ObjectIDsFromStrings(s []string) ([]primitive.ObjectID, error) {
	var ids []primitive.ObjectID
	for _, v := range s {
		eid, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return nil, err
		}
		ids = append(ids, eid)
	}

	return ids, nil
}

func StringFromObjectID(oid *primitive.ObjectID) (result *string) {
	if oid != nil && *oid != primitive.NilObjectID {
		s := (*oid).Hex()
		result = &s
	}
	return result
}

func StringsFromObjectIDs(oids []primitive.ObjectID) (result []string) {
	for _, v := range oids {
		result = append(result, v.Hex())
	}
	return result
}
