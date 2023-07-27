-- CreateTable
CREATE TABLE `Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(255) NOT NULL,
    `sd_model_checkpoint` VARCHAR(128) NOT NULL,
    `sd_vae` VARCHAR(128) NOT NULL,
    `sampler_name` VARCHAR(64) NOT NULL,
    `prompt` VARCHAR(1024) NOT NULL,
    `negative_prompt` VARCHAR(1024) NOT NULL,
    `cfg_scale` FLOAT NOT NULL,
    `steps` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Images_image_url_key`(`image_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
