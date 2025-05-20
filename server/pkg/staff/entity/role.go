package staff_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Роль
type Role struct {
	shared_entity.BaseDocument
	Title       string          // Название
	Permissions RolePermissions // Набор полномочий
}

type Roles []Role
type RolePtrs []*Role

type RolePermission string
type RolePermissions []RolePermission

func (r RolePermissions) String() []string {
	result := make([]string, 0, len(r))
	for _, v := range r {
		result = append(result, string(v))
	}
	return result
}

const (
	RolePermissionStaffSaveEmployee   RolePermission = "STAFF_SAVE_EMPLOYEE"
	RolePermissionStaffSavePosition   RolePermission = "STAFF_SAVE_POSITION"
	RolePermissionStaffSaveDepartment RolePermission = "STAFF_SAVE_DEPARTMENT"
	RolePermissionStaffSaveRole       RolePermission = "STAFF_SAVE_ROLE"

	RolePermissionStaffDeleteEmployee   RolePermission = "STAFF_DELETE_EMPLOYEE"
	RolePermissionStaffDeletePosition   RolePermission = "STAFF_DELETE_POSITION"
	RolePermissionStaffDeleteDepartment RolePermission = "STAFF_DELETE_DEPARTMENT"
	RolePermissionStaffDeleteRole       RolePermission = "STAFF_DELETE_ROLE"

	RolePermissionContentSaveArticle      RolePermission = "CONTENT_SAVE_ARTICLE"
	RolePermissionContentSaveArticleGroup RolePermission = "CONTENT_SAVE_ARTICLE_GROUP"
	RolePermissionContentSavePage         RolePermission = "CONTENT_SAVE_PAGE"
	RolePermissionContentSaveReview       RolePermission = "CONTENT_SAVE_REVIEW"
	RolePermissionContentSaveStory        RolePermission = "CONTENT_SAVE_STORY"
	RolePermissionContentSaveVacancy      RolePermission = "CONTENT_SAVE_VACANCY"

	RolePermissionContentDeleteArticle      RolePermission = "CONTENT_DELETE_ARTICLE"
	RolePermissionContentDeleteArticleGroup RolePermission = "CONTENT_DELETE_ARTICLE_GROUP"
	RolePermissionContentDeletePage         RolePermission = "CONTENT_DELETE_PAGE"
	RolePermissionContentDeleteReview       RolePermission = "CONTENT_DELETE_REVIEW"
	RolePermissionContentDeleteStory        RolePermission = "CONTENT_DELETE_STORY"
	RolePermissionContentDeleteVacancy      RolePermission = "CONTENT_DELETE_VACANCY"

	RolePermissionSystemViewLog RolePermission = "SYSTEM_VIEW_LOG"
)
