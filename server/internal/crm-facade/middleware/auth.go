package crm_middleware

import (
	"context"
	"net/http"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	staff_service "github.com/pinks-agency/ecn/server/pkg/staff/service"
	"github.com/pinks-agency/ecn/server/utils"
)

var ctxKey = &contextKey{"user"}
var userIDKey = "userID"

type contextKey struct {
	name string
}

type AuthContext struct {
	Id          string
	Permissions staff_entity.RolePermissions
}

func AuthMiddleware(staffService staff_service.IStaffService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")

			// Allow unauthenticated users in
			if header == "" {
				next.ServeHTTP(w, r)
				return
			}

			//validate jwt token
			tokenStr := header
			claims, err := utils.ValidateToken(tokenStr)
			if err != nil {
				http.Error(w, "Invalid token", http.StatusForbidden)
				return
			}

			// create user and check if user exists in db
			// slog.Debug("Finding user...", "id", claims.UserId)
			employee, err := staffService.GetEmployeeByID(context.Background(), claims.UserId)
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}

			// slog.Debug("Filling context...", "ID", employee.ID, "Permissions", employee.Permissions)
			// put it in context
			ctx := context.WithValue(r.Context(), ctxKey, &AuthContext{
				Id:          employee.ID,
				Permissions: employee.Permissions,
			})

			ctx = context.WithValue(ctx, userIDKey, employee.ID)

			// and call the next with our new context
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext get data from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) *AuthContext {
	raw, _ := ctx.Value(ctxKey).(*AuthContext)
	return raw
}
