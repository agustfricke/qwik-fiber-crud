package model

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Body string `gorm:"not null" json:"body"`
}
