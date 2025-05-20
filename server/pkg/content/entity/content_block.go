package content_entity

// Блок контента
type ContentBlock struct {
	Type      ContentBlockType       // Тип блока
	Data      map[string]interface{} // Сырые данные в JSON-формате
	IsVisible bool                   // Признак видимости блока
}

type ContentBlocks []ContentBlock     // Массив блоков контента
type ContentBlockPtrs []*ContentBlock // Массив указателей на блоки контента

type ContentBlockType string // Тип блка контента

const (
	ContentBlockTypeText      ContentBlockType = "TEXT"      // Текстовый блок
	ContentBlockTypeCite      ContentBlockType = "CITE"      // Блок цитаты
	ContentBlockTypeFiles     ContentBlockType = "FILES"     // Блок документов/файлов
	ContentBlockTypeYoutube   ContentBlockType = "YOUTUBE"   // Блок с видеороликом
	ContentBlockTypeImages    ContentBlockType = "IMAGES"    // Блок галереи изображений
	ContentBlockTypeAccordion ContentBlockType = "ACCORDION" // Блок аккордеона
	ContentBlockTypeSpecial   ContentBlockType = "SPECIAL"   // Специальный блок произвольного типа
)
