package estate_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Property struct {
	shared_entity.BaseDocument

	InternalID      *int              // Внутренний номер объекта
	Deal            *Deal             // Вид сделки
	Type            *PropertyType     // Тип
	SubType         *PropertySubType  // Подтип
	CommercialUsage []CommercialUsage // Коммерческое использование

	FromDeveloper *bool // От застройщика

	InComplex      *bool   // В ЖК
	ComplexID      *string // ЖК
	ComplexHouseID *string // ГП

	InVillage *bool   // В КП
	VillageID *string // КП

	IsHot *bool // Горячее предложение

	Title         *string  // Название объекта
	Description   *string  // Описание
	Address       *string  // Адрес
	Lat           *float64 // Широта
	Lon           *float64 // Долгота
	CadastrNumber *string  // Кадастровый номер
	SeoText       *string  // Описание для SEO
	YoutubeLink   *string  // Ссылка на YT
	TourLink      *string  // Ссылка на 3Д-тур

	DocumentIDs []string // Вложения
	ImageIDs    []string // Фотогалерея

	IsDeleted   *bool     // Признак удаления
	IsEditable  *bool     // Признак возможности редактирования
	RefreshDate time.Time // Дата актуализации

	Status *PropertyStatus // Статус объекта

	Price         *float64  // Цена
	PricePerMeter *float64  // Цена за квадрат
	PricePerAr    *float64  // Цена за сотку
	PriceHistory  []float64 // Истрория изменения цены

	IsReady          *bool
	ReadinessYear    *int     // Год готовности
	ReadinessQuarter *Quarter // Квартал готовности

	InCity       *bool   // В черте города
	CityDistance *int    // Расстояние до города
	Region       *string // Район
	SubRegion    *string // Микрорайон

	Source *PropertySource // Источник

	Rooms         *int        // Кол-во комнат
	Area          *float64    // Общая площадь
	LandArea      *float64    // Площадь участка
	LivingArea    *float64    // Жилая площадь
	KitchenArea   *float64    // Площадь кухни
	ToiletType    *ToiletType // Тип санузла
	RehabType     *RehabType  // Вид ремонта
	Floor         *int        // Этаж
	Floors        *int        // Кол-во этажей
	CeilingHeight *float64    // Высота потолков

	InternalInfo *string // Служебная информация

	ComissionPercent *float64 // Размер комиссии в процентах
	ComissionAmount  *float64 // Размер комиссии в рублях
}

type Properties []Property
type PropertyPtrs []*Property

type PropertyStatus string

const (
	PropertyStatusUnset        PropertyStatus = ""
	PropertyStatusPublished    PropertyStatus = "PUBLISHED"
	PropertyStatusUnpublished  PropertyStatus = "UNPUBLISHED"
	PropertyStatusOnModeration PropertyStatus = "ON_MODERATION"
	PropertyStatusArchived     PropertyStatus = "ARCHIVED"
	PropertyStatusTrash        PropertyStatus = "TRASH"
)

type Deal string

const (
	DealUnset Deal = ""
	DealSell  Deal = "SELL"
	DealRent  Deal = "RENT"
)

type RehabType string

const (
	RehabTypeUnset     RehabType = ""
	RehabTypeNone      RehabType = "NONE"      // Без ремонта
	RehabTypeDraft     RehabType = "DRAFT"     // Черновая отделка
	RehabTypeDeveloper RehabType = "DEVELOPER" // От застройщика
	RehabTypeDesign    RehabType = "DESIGN"    // Дизайнерский
	RehabTypeClean     RehabType = "CLEAN"     // Чистовая отделка
)

type ToiletType string

const (
	ToiletTypeUnset    ToiletType = ""
	ToiletTypeUnited   ToiletType = "UNITED"
	ToiletTypeSplitted ToiletType = "SPLITTED"
)

type Quarter string

const (
	QuarterUnset Quarter = ""
	QuarterI     Quarter = "I"
	QuarterII    Quarter = "II"
	QuarterIII   Quarter = "III"
	QuarterIV    Quarter = "IV"
)

type PropertyType string

const (
	PropertyTypeUnset      PropertyType = ""
	PropertyTypeUsed       PropertyType = "USED"
	PropertyTypeNew        PropertyType = "NEW"
	PropertyTypeVillage    PropertyType = "VILLAGE"
	PropertyTypeSuburban   PropertyType = "SUBURBAN"
	PropertyTypeCommercial PropertyType = "COMMERCIAL"
)

type PropertySubType string

const (
	PropertySubTypeUnset       PropertySubType = ""
	PropertySubTypeFlat        PropertySubType = "FLAT"
	PropertySubTypeRoom        PropertySubType = "ROOM"
	PropertySubTypeApartment   PropertySubType = "APARTMENT"
	PropertySubTypeStudio      PropertySubType = "STUDIO"
	PropertySubTypeLand        PropertySubType = "LAND"
	PropertySubTypeHouse       PropertySubType = "HOUSE"
	PropertySubTypeTownhouse   PropertySubType = "TOWNHOUSE"
	PropertySubTypeSummerHouse PropertySubType = "SUMMER_HOUSE"
	PropertySubTypeGarage      PropertySubType = "GARAGE"
	PropertySubTypeParking     PropertySubType = "PARKING"
)

type CommercialUsage string

const (
	CommercialUsageUnset      CommercialUsage = ""
	CommercialUsageRetail     CommercialUsage = "RETAIL"
	CommercialUsageOffice     CommercialUsage = "OFFICE"
	CommercialUsageFreeUsage  CommercialUsage = "FREE_USAGE"
	CommercialUsageBase       CommercialUsage = "BASE"
	CommercialUsageBusiness   CommercialUsage = "BUSINESS"
	CommercialUsageProduction CommercialUsage = "PRODUCTION"
	CommercialUsageParking    CommercialUsage = "PARKING"
	CommercialUsageWarehouse  CommercialUsage = "WAREHOUSE"
)

type PropertySource string

const (
	PropertySourceUnset           PropertySource = ""
	PropertySourceAvito           PropertySource = "AVITO"
	PropertySourceYoula           PropertySource = "YOULA"
	PropertySourceCian            PropertySource = "CIAN"
	PropertySourceDomclick        PropertySource = "DOMCLICK"
	PropertySourceYandex          PropertySource = "YANDEX"
	PropertySourceOtherAggregator PropertySource = "OTHER_AGGREGATOR"
	PropertySourceRecommendation  PropertySource = "RECOMMENDATION"
	PropertySourceReturnedClient  PropertySource = "RETURNED_CLIENT"
	PropertySourceLists           PropertySource = "LISTS"
	PropertySourceSelection       PropertySource = "SELECTION"
	PropertySourceOther           PropertySource = "OTHER"
)
