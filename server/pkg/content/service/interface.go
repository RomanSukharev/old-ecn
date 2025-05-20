package content_service

import (
	"context"
	"errors"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

var (
	ErrArticleGroupNotFound   = errors.New("record was not found in the repository")
	ErrArticleNotFound        = errors.New("record was not found in the repository")
	ErrPageNotFound           = errors.New("record was not found in the repository")
	ErrReviewNotFound         = errors.New("record was not found in the repository")
	ErrStoryNotFound          = errors.New("record was not found in the repository")
	ErrVacancyRequestNotFound = errors.New("record was not found in the repository")
	ErrVacancyNotFound        = errors.New("record was not found in the repository")
)

type IContentService interface {
	SearchArticleGroups(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleGroupSort, filter *content_entity.ArticleGroupFilter) ([]*content_entity.ArticleGroup, int, error)
	GetArticleGroupByID(ctx context.Context, id string) (*content_entity.ArticleGroup, error)
	SaveArticleGroup(ctx context.Context, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error)
	DeleteArticleGroup(ctx context.Context, id string) error
	BulkDeleteArticleGroups(ctx context.Context, ids []string) error

	SearchArticles(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleSort, filter *content_entity.ArticleFilter) ([]*content_entity.Article, int, error)
	GetArticleByID(ctx context.Context, id string) (*content_entity.Article, error)
	SaveArticle(ctx context.Context, input content_entity.Article) (*content_entity.Article, error)
	DeleteArticle(ctx context.Context, id string) error
	BulkDeleteArticles(ctx context.Context, ids []string) error

	SearchPages(ctx context.Context, skip *int, limit *int, sort content_entity.PageSort, filter *content_entity.PageFilter) ([]*content_entity.Page, int, error)
	GetPageByID(ctx context.Context, id string) (*content_entity.Page, error)
	GetPageByUrl(ctx context.Context, url string) (*content_entity.Page, error)
	SavePage(ctx context.Context, input content_entity.Page) (*content_entity.Page, error)
	DeletePage(ctx context.Context, id string) error
	BulkDeletePages(ctx context.Context, ids []string) error

	SearchReviews(ctx context.Context, skip *int, limit *int, sort content_entity.ReviewSort, filter *content_entity.ReviewFilter) ([]*content_entity.Review, int, error)
	GetReviewByID(ctx context.Context, id string) (*content_entity.Review, error)
	SaveReview(ctx context.Context, input content_entity.Review) (*content_entity.Review, error)
	DeleteReview(ctx context.Context, id string) error
	BulkDeleteReviews(ctx context.Context, ids []string) error
	BulkApproveReviews(ctx context.Context, ids []string) error
	BulkDeclineReviews(ctx context.Context, ids []string) error

	SearchStories(ctx context.Context, skip *int, limit *int, sort content_entity.StorySort, filter *content_entity.StoryFilter) ([]*content_entity.Story, int, error)
	GetStoryByID(ctx context.Context, id string) (*content_entity.Story, error)
	GetStoryByUrl(ctx context.Context, url string) (*content_entity.Story, error)
	SaveStory(ctx context.Context, input content_entity.Story) (*content_entity.Story, error)
	DeleteStory(ctx context.Context, id string) error
	BulkDeleteStories(ctx context.Context, ids []string) error

	SearchVacancyRequests(ctx context.Context, skip *int, limit *int, sort content_entity.VacancyRequestSort, filter *content_entity.VacancyRequestFilter) ([]*content_entity.VacancyRequest, int, error)
	GetVacancyRequestByID(ctx context.Context, id string) (*content_entity.VacancyRequest, error)
	SaveVacancyRequest(ctx context.Context, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error)
	DeleteVacancyRequest(ctx context.Context, id string) error
	ApproveVacancyRequest(ctx context.Context, id string) error
	DeclineVacancyRequest(ctx context.Context, id string) error
	BulkDeleteVacancyRequests(ctx context.Context, ids []string) error

	SearchVacancies(ctx context.Context, skip *int, limit *int, sort content_entity.VacancySort, filter *content_entity.VacancyFilter) ([]*content_entity.Vacancy, int, error)
	GetVacancyByID(ctx context.Context, id string) (*content_entity.Vacancy, error)
	SaveVacancy(ctx context.Context, input content_entity.Vacancy) (*content_entity.Vacancy, error)
	DeleteVacancy(ctx context.Context, id string) error
	BulkDeleteVacancies(ctx context.Context, ids []string) error
}
