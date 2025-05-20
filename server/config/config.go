package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	_ "github.com/joho/godotenv/autoload"
)

type (
	Config struct {
		Services       `yaml:"services"`
		Infrastructure `yaml:"infrastructure"`
	}

	Services struct {
		CRMFacade    `yaml:"crm-facade"`
		PublicFacade `yaml:"public-facade"`
	}

	CRMFacade struct {
		Port     string   `yaml:"port" env:"SERVICES__CRM_FACADE__PORT"`
		LogLevel LogLevel `env-default:"info" yaml:"log-level" env:"SERVICES__CRM_FACADE__LOG_LEVEL"`
		Origins  []string `yaml:"origins" env-default:"*" env:"SERVICES__CRM_FACADE__ORIGINS"`
	}

	PublicFacade struct {
		Port     string   `yaml:"port" env:"SERVICES__PUBLIC_FACADE__PORT"`
		LogLevel LogLevel `env-default:"info" yaml:"log-level" env:"SERVICES__PUBLIC_FACADE__LOG_LEVEL"`
		Origins  []string `yaml:"origins" env-default:"*" env:"SERVICES__PUBLIC_FACADE__ORIGINS"`
	}

	Infrastructure struct {
		MongoDB `yaml:"mongodb"`
		Redis   `yaml:"redis"`
		S3      `yaml:"s3"`
		Mail    `yaml:"mail"`
	}

	MongoDB struct {
		Uri      string `yaml:"uri" env:"INFRASTRUCTURE__MONGODB__URI"`
		Database string `yaml:"database" env:"INFRASTRUCTURE__MONGODB__DATABASE"`
	}

	Redis struct {
		Url string `yaml:"url" env:"INFRASTRUCTURE__REDIS__URL"`
	}

	S3 struct {
		Endpoint     string `yaml:"endpoint" env:"INFRASTRUCTURE__S3__ENDPOINT"`
		PublicDomain string `yaml:"public-domain" env:"INFRASTRUCTURE__S3__PUBLIC_DOMAIN"`
		Bucket       string `yaml:"bucket" env:"INFRASTRUCTURE__S3__BUCKET"`
		AccessKey    string `yaml:"access-key" env:"INFRASTRUCTURE__S3__ACCESS_KEY"`
		SecretKey    string `yaml:"secret-key" env:"INFRASTRUCTURE__S3__SECRET_KEY"`
	}

	Mail struct{}
)

type LogLevel string

const (
	LogLevelDebug  LogLevel = "debug"
	LogLevelInfo   LogLevel = "info"
	LogLevelWarn   LogLevel = "warn"
	LogLevelError  LogLevel = "error"
	LogLevelSilent LogLevel = "silent"
)

func MustLoad() *Config {
	cfg := &Config{}

	// Read YAML config file and override with ENV
	err := cleanenv.ReadConfig("./config/config.yml", cfg)
	if err != nil {
		// If YAML config is missing/corrupted - read ENV instead
		cleanenv.ReadEnv(cfg)
	}

	return cfg
}
