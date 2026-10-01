import * as React from 'react';
import { graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Layout from '@components/layout';
import Button from '@components/button';

import financialReports from '../../data/financial-reports';
import BannerImage from '@media/common/banner.jpg';

const PRESENTATION_PDF = '/documents/presentations/granada-corporate-presentation-2026-09.pdf';
const TECHNICAL_REPORT_PDF = '/documents/technical-reports/granada-ni-43-101-technical-report-2026.pdf';
const AGM_NOTICE_PDF = '/documents/agm/2026-notice-of-meeting.pdf';
const AGM_PROXY_PDF = '/documents/agm/2026-form-of-proxy.pdf';
const AGM_CIRCULAR_PDF = '/documents/agm/2026-information-circular.pdf';

const STOCK_WIDGET_CONFIG = {
  symbol: 'TSXV:GGM',
  width: '100%',
  height: 400,
  dateRange: '12M',
  colorTheme: 'light',
  trendLineColor: 'rgba(215, 156, 0, 1)',
  underLineColor: 'rgba(215, 156, 0, 0.3)',
  underLineBottomColor: 'rgba(215, 156, 0, 0)',
  isTransparent: false,
  autosize: false,
  largeChartUrl: '',
};

const PERIODS = ['q1', 'q2', 'q3', 'annual'];

function ReportLinks({ report }) {
  const { t } = useTranslation();

  if (!report) return <span className='text-tertiary'>—</span>;

  return (
    <div className='flex flex-wrap gap-2'>
      <a className='rounded-lg bg-primary px-3 py-1 text-white hover:shadow-button' target='_blank' rel='noreferrer' href={report.fs}>
        {t('fs')}
      </a>
      <a
        className='rounded-lg border-2 border-primary px-3 py-1 text-primary hover:shadow-button'
        target='_blank'
        rel='noreferrer'
        href={report.mda}
      >
        {t('mda')}
      </a>
    </div>
  );
}

export default function Investors() {
  const { t, i18n } = useTranslation();

  const stockWidgetSrc = `https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=${
    i18n.language
  }#${encodeURIComponent(JSON.stringify(STOCK_WIDGET_CONFIG))}`;

  return (
    <Layout>
      <div>
        <div id='stockInformation' className='container mx-auto px-5 pb-10 pt-36 text-center md:px-10 md:pb-20 md:pt-44'>
          <p className='text-tertiary'>{t('stockSubtitle')}</p>
          <h1 className='my-4 text-4xl text-secondary'>{t('stockTitle')}</h1>
          <p>{t('stockDescription')}</p>

          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
          >
            <iframe className='mt-10 h-[450px] w-full md:mt-16' title='GRANADA GOLD MINE INC' src={stockWidgetSrc}></iframe>
          </motion.div>
        </div>

        <div className='bg-tertiary/10 py-20'>
          <div id='shareStructure' className='container mx-auto px-5 text-center md:px-10'>
            <p className='text-primary'>{t('capitalSubtitle')}</p>
            <h2 className='mb-16 mt-4 text-4xl text-secondary'>{t('capitalTitle')}</h2>

            <div className='grid gap-6 md:grid-cols-3'>
              {[1, 2, 3].map((stat, index) => (
                <motion.div
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  initial={{ x: '80px', opacity: 0 }}
                  whileInView={{ x: '0', opacity: 1 }}
                  className='rounded-lg bg-white p-10 text-center'
                  key={stat}
                >
                  <p className='mb-2 text-3xl text-primary'>{t(`capitalStats${stat}Value`)}</p>
                  <p className='text-tertiary'>{t(`capitalStats${stat}`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div id='financials' className='container mx-auto px-5 py-20 md:px-10'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='rounded-2xl bg-white p-5 md:p-10'
          >
            <p className='text-tertiary'>{t('financialSubtitle')}</p>
            <Trans parent='h2' i18nKey='financialTitle' className='mb-2 mt-4 text-4xl text-secondary'></Trans>
            <p className='mb-6 text-tertiary'>{t('financialNote')}</p>

            <div className='overflow-x-auto'>
              <table className='w-full min-w-[760px] text-left'>
                <thead>
                  <tr className='border-b-2 border-tertiary text-tertiary'>
                    <th className='py-4 pr-4 font-normal'>{t('fiscalYear')}</th>
                    {PERIODS.map((period) => (
                      <th className='py-4 pr-4 font-normal' key={period}>
                        {t(period)}
                      </th>
                    ))}
                    <th className='py-4 font-normal'>{t('agm')}</th>
                  </tr>
                </thead>
                <tbody>
                  {financialReports.map((row) => (
                    <tr className='border-b border-tertiary/50' key={row.year}>
                      <td className='py-4 pr-4 text-2xl text-secondary'>{row.year}</td>
                      {PERIODS.map((period) => (
                        <td className='py-4 pr-4' key={period}>
                          <ReportLinks report={row[period]} />
                        </td>
                      ))}
                      <td className='py-4'>
                        {row.agm ? (
                          <a
                            className='rounded-lg border-2 border-secondary px-3 py-1 text-secondary hover:shadow-button'
                            target='_blank'
                            rel='noreferrer'
                            href={row.agm}
                          >
                            {t('agm')}
                          </a>
                        ) : (
                          <span className='text-tertiary'>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div
          id='files'
          style={{ '--bg-image-url': `url(${BannerImage})` }}
          className={`bg-[image:var(--bg-image-url)] bg-cover bg-center py-10 md:py-20`}
        >
          <div className='container mx-auto grid gap-5 px-5 md:grid-cols-2 md:gap-16 md:px-10'>
            <motion.div
              id='presentations'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ x: '-80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col justify-between gap-6 rounded-2xl bg-white p-5 md:p-10'
            >
              <p className='text-2xl text-primary'>{t('presentation')}</p>
              <Button external type='primary-outlined' href={PRESENTATION_PDF}>
                {t('presentationButton')}
              </Button>
            </motion.div>

            <motion.div
              id='technicalReports'
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              initial={{ x: '80px', opacity: 0 }}
              whileInView={{ x: '0', opacity: 1 }}
              className='flex flex-col justify-between gap-6 rounded-2xl bg-secondary p-5 md:p-10'
            >
              <div>
                <p className='mb-2 uppercase text-tertiary'>{t('technicalReportDate')}</p>
                <p className='mb-4 text-2xl text-white'>{t('technicalReport')}</p>
                <p className='text-white'>{t('technicalReportDescription')}</p>
              </div>
              <Button external type='tertiary' href={TECHNICAL_REPORT_PDF}>
                {t('technicalReportButton')}
              </Button>
            </motion.div>
          </div>
        </div>

        <div id='AGM' className='container mx-auto px-5 py-20 md:px-10'>
          <h2 className='mb-16 text-center text-4xl text-secondary'>{t('agmTitle')}</h2>

          <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
            {[
              ['agmNotice', AGM_NOTICE_PDF],
              ['agmManagement', AGM_CIRCULAR_PDF],
              ['agmProxyForm', AGM_PROXY_PDF],
            ].map(([key, href], index) => (
              <motion.div
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                initial={{ x: '80px', opacity: 0 }}
                whileInView={{ x: '0', opacity: 1 }}
                className='flex flex-col justify-between gap-6 rounded-2xl bg-secondary p-5 md:p-10'
                key={key}
              >
                <div>
                  <p className='mb-2 uppercase text-tertiary'>{t(`${key}Date`)}</p>
                  <p className='text-2xl text-white'>{t(key)}</p>
                </div>
                <Button external type='tertiary' href={href}>
                  {t(`${key}Button`)}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div id='analystCoverage' className='container mx-auto px-5 pb-20 md:px-10'>
          <motion.div
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            initial={{ y: '80px', opacity: 0 }}
            whileInView={{ y: '0', opacity: 1 }}
            className='rounded-2xl bg-white p-5 md:p-10'
          >
            <h3 className='mb-6 text-3xl text-secondary'>{t('analystTitle')}</h3>
            <p>{t('analystDescription')}</p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export function Head() {
  return (
    <>
      <html lang='en' />
      <title>Investors | Granada Gold Mine</title>
      <meta
        name='description'
        content='Granada Gold Mine Inc. (TSX-V: GGM) investor information: stock price, share structure, financial reports and filings, presentations, NI 43-101 technical reports and AGM documents.'
      />
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "investors"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
