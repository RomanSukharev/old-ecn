package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type AuthClaims struct {
	jwt.RegisteredClaims
	UserId      string   `json:"userId"`
	Permissions []string `json:"permissions"`
}

type AuthPayload struct {
	UserId      string   `json:"userId"`
	Permissions []string `json:"permissions"`
}

func CreateToken(ttl time.Duration, payload *AuthPayload) (string, error) {
	now := time.Now().UTC()

	claims := AuthClaims{
		jwt.RegisteredClaims{
			// A usual scenario is to set the expiration time relative to the current time
			ExpiresAt: jwt.NewNumericDate(now.Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
		},
		payload.UserId,
		payload.Permissions,
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte("salt"))

	if err != nil {
		return "", fmt.Errorf("create: sign token: %w", err)
	}

	return token, nil
}

func ValidateToken(token string) (*AuthClaims, error) {
	parsedToken, err := jwt.ParseWithClaims(token, &AuthClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("salt"), nil
	})

	if err != nil {
		return nil, fmt.Errorf("validate: %w", err)
	}

	claims, ok := parsedToken.Claims.(*AuthClaims)
	if !ok || !parsedToken.Valid {
		return nil, fmt.Errorf("validate: invalid token")
	}

	return claims, nil
}
