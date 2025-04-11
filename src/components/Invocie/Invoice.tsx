import React from 'react';
import styles from './invoice.module.css';

const Invoice = ({ref}) => {
//   const handlePrint = () => {
//     window.print();
//   };

  return (
    <div className={styles.invoiceContainer}  ref={ref}>
      {/* <button onClick={handlePrint} className={styles.printButton}>
        Print Invoice
      </button> */}
      
      <div className={styles.py4}>
        <div className={`${styles.px14} ${styles.py6}`}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
            <tbody>
              <tr>
                <td className={`${styles.wFull} ${styles.alignTop}`}>
                  <div>
                    <img src="https://menkoff.com/assets/brand-sample.png" className={styles.h12} alt="Company Logo" />
                  </div>
                </td>

                <td className={styles.alignTop}>
                  <div className={styles.textSm}>
                    <table className={`${styles.borderCollapse} ${styles.borderSpacing0}`}>
                      <tbody>
                        <tr>
                          <td className={`${styles.borderR} ${styles.pr4}`}>
                            <div>
                              <p className={`${styles.whitespaceNowrap} ${styles.textSlate400} ${styles.textRight}`}>Date</p>
                              <p className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain} ${styles.textRight}`}>April 26, 2023</p>
                            </div>
                          </td>
                          <td className={styles.pl4}>
                            <div>
                              <p className={`${styles.whitespaceNowrap} ${styles.textSlate400} ${styles.textRight}`}>Invoice #</p>
                              <p className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain} ${styles.textRight}`}>BRA-00335</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${styles.bgSlate100} ${styles.px14} ${styles.py6} ${styles.textSm}`}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
            <tbody>
              <tr>
                <td className={`${styles.wHalf} ${styles.alignTop}`}>
                  <div className={`${styles.textSm} ${styles.textNeutral600}`}>
                    <p className={styles.fontBold}>Supplier Company INC</p>
                    <p>Number: 23456789</p>
                    <p>VAT: 23456789</p>
                    <p>6622 Abshire Mills</p>
                    <p>Port Orlofurt, 05820</p>
                    <p>United States</p>
                  </div>
                </td>
                <td className={`${styles.wHalf} ${styles.alignTop} ${styles.textRight}`}>
                  <div className={`${styles.textSm} ${styles.textNeutral600}`}>
                    <p className={styles.fontBold}>Customer Company</p>
                    <p>Number: 123456789</p>
                    <p>VAT: 23456789</p>
                    <p>9552 Vandervort Spurs</p>
                    <p>Paradise, 43325</p>
                    <p>United States</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${styles.px14} ${styles.py10} ${styles.textSm} ${styles.textNeutral700}`}>
          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
            <thead>
              <tr>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl3} ${styles.fontBold} ${styles.textMain}`}>#</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.fontBold} ${styles.textMain}`}>Product details</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Price</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textCenter} ${styles.fontBold} ${styles.textMain}`}>Qty.</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textCenter} ${styles.fontBold} ${styles.textMain}`}>VAT</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Subtotal</td>
                <td className={`${styles.borderB2} ${styles.borderMain} ${styles.pb3} ${styles.pl2} ${styles.pr3} ${styles.textRight} ${styles.fontBold} ${styles.textMain}`}>Subtotal + VAT</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl3}`}>1.</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2}`}>Montly accountinc services</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$150.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>1</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>20%</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$150.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} ${styles.textRight}`}>$180.00</td>
              </tr>
              <tr>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl3}`}>2.</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2}`}>Taxation consulting (hour)</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$60.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>2</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>20%</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$120.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} ${styles.textRight}`}>$144.00</td>
              </tr>
              <tr>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl3}`}>3.</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2}`}>Bookkeeping services</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$50.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>1</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textCenter}`}>20%</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.textRight}`}>$50.00</td>
                <td className={`${styles.borderB} ${styles.py3} ${styles.pl2} ${styles.pr3} ${styles.textRight}`}>$60.00</td>
              </tr>
              <tr>
                <td colSpan="7">
                  <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
                    <tbody>
                      <tr>
                        <td className={styles.wFull}></td>
                        <td>
                          <table className={`${styles.wFull} ${styles.borderCollapse} ${styles.borderSpacing0}`}>
                            <tbody>
                              <tr>
                                <td className={`${styles.borderB} ${styles.p3}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.textSlate400}`}>Net total:</div>
                                </td>
                                <td className={`${styles.borderB} ${styles.p3} ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain}`}>$320.00</div>
                                </td>
                              </tr>
                              <tr>
                                <td className={styles.p3}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.textSlate400}`}>VAT total:</div>
                                </td>
                                <td className={`${styles.p3} ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textMain}`}>$64.00</div>
                                </td>
                              </tr>
                              <tr>
                                <td className={`${styles.bgMain} ${styles.p3}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textWhite}`}>Total:</div>
                                </td>
                                <td className={`${styles.bgMain} ${styles.p3} ${styles.textRight}`}>
                                  <div className={`${styles.whitespaceNowrap} ${styles.fontBold} ${styles.textWhite}`}>$384.00</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${styles.px14} ${styles.textSm} ${styles.textNeutral700}`}>
          <p className={`${styles.textMain} ${styles.fontBold}`}>PAYMENT DETAILS</p>
          <p>Banks of Banks</p>
          <p>Bank/Sort Code: 1234567</p>
          <p>Account Number: 123456678</p>
          <p>Payment Reference: BRA-00335</p>
        </div>

        <div className={`${styles.px14} ${styles.py10} ${styles.textSm} ${styles.textNeutral700}`}>
          <p className={`${styles.textMain} ${styles.fontBold}`}>Notes</p>
          <p className={styles.italic}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
        </div>

        <footer className={`${styles.fixed} ${styles.bottom0} ${styles.left0} ${styles.bgSlate100} ${styles.wFull} ${styles.textNeutral600} ${styles.textCenter} ${styles.textXs} ${styles.py3}`}>
          Supplier Company
          <span className={`${styles.textSlate300} ${styles.px2}`}>|</span>
          info@company.com
          <span className={`${styles.textSlate300} ${styles.px2}`}>|</span>
          +1-202-555-0106
        </footer>
      </div>
    </div>
  );
};

export default Invoice;