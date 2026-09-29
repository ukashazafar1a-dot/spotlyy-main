import { getTranslations } from 'next-intl/server'
import React from 'react'

const page = async () => {
  const t = await getTranslations('Aboutus');
  return (
    <div>
      <h2>{t("title")}</h2>
      <p>{t('description')}</p>
    </div>
  )
}

export default page