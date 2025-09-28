import prisma from '../config/prisma.js';
import { generateShortCode } from '../utils/generateShortCode.js';

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: 'URL is required',
      });
    }

    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid URL format',
      });
    }

    let shortCode;
    let isUnique = false;

    while (!isUnique) {
      shortCode = generateShortCode();
      const existing = await prisma.url.findUnique({
        where: {
          shortCode,
        },
      });

      if (!existing) {
        isUnique = true;
      }
    }

    const newUrl = await prisma.url.create({
      data: {
        url,
        shortCode,
      },
    });

    res.status(201).json({
      id: newUrl.id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const urlRecord = await prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        accessCount: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      id: urlRecord.id,
      url: urlRecord.url,
      shortCode: urlRecord.shortCode,
      createdAt: urlRecord.createdAt,
      updatedAt: urlRecord.updatedAt,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Short URL not found',
      });
    }

    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const updateUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: 'URL is required',
      });
    }

    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid URL format',
      });
    }

    const updatedUrl = await prisma.url.update({
      where: {
        shortCode,
      },
      data: { url },
    });

    res.status(200).json({
      id: updatedUrl.id,
      url: updatedUrl.url,
      shortCode: updatedUrl.shortCode,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Short URL not found',
      });
    }
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
