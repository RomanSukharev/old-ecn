package content_service

import (
	content_repository "github.com/pinks-agency/ecn/server/pkg/content/repository"
	content_mongodb "github.com/pinks-agency/ecn/server/pkg/content/repository/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
)

type contentService struct {
	articleGroupDataRepo    content_repository.IArticleGroupDataRepository    // Article group repository
	articleGroupCacheRepo   content_repository.IArticleGroupCacheRepository   // Article group caching repository
	articleDataRepo         content_repository.IArticleDataRepository         // Article repository
	articleCacheRepo        content_repository.IArticleCacheRepository        // Article caching repository
	pageDataRepo            content_repository.IPageDataRepository            // Page repository
	pageCacheRepo           content_repository.IPageCacheRepository           // Page caching repository
	reviewDataRepo          content_repository.IReviewDataRepository          // Review repository
	reviewCacheRepo         content_repository.IReviewCacheRepository         // Review caching repository
	storyDataRepo           content_repository.IStoryDataRepository           // Story repository
	storyCacheRepo          content_repository.IStoryCacheRepository          // Story caching repository
	vacancyRequestDataRepo  content_repository.IVacancyRequestDataRepository  // Vacancy request repository
	vacancyRequestCacheRepo content_repository.IVacancyRequestCacheRepository // Vacancy request caching repository
	vacancyDataRepo         content_repository.IVacancyDataRepository         // Vacancy repository
	vacancyCacheRepo        content_repository.IVacancyCacheRepository        // Vacancy caching repository
}

type contentServiceOptions func(s *contentService) error

func New(cfgs ...contentServiceOptions) (IContentService, error) {
	os := &contentService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	return os, nil
}

func WithMongoDB(db *mongo.Database) contentServiceOptions {
	return func(os *contentService) error {
		os.articleGroupDataRepo = content_mongodb.NewArticleGroupRepository(db)
		os.articleDataRepo = content_mongodb.NewArticleRepository(db)
		os.pageDataRepo = content_mongodb.NewPageRepository(db)
		os.reviewDataRepo = content_mongodb.NewReviewRepository(db)
		os.storyDataRepo = content_mongodb.NewStoryRepository(db)
		os.vacancyRequestDataRepo = content_mongodb.NewVacancyRequestRepository(db)
		os.vacancyDataRepo = content_mongodb.NewVacancyRepository(db)
		return nil
	}
}
