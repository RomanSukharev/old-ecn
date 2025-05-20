package utils

import (
	"context"
)

var ctxUserID = "userID"

func GetUserID(ctx context.Context) string {
	val := ctx.Value(ctxUserID)
	userID, ok := val.(string)
	if !ok {
		return ""
	}
	return userID
}
