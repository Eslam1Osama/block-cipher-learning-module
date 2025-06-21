# Data Security Learning Module: Block Cipher Operation Modes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, single-page web application designed to teach the core concepts of **Block Cipher Operation Modes** for the **ECE4304 Data Security** course. This project transforms complex cryptographic concepts into a responsive, engaging, and easy-to-understand learning experience.

### [Live Demo Link](https://block-cipher-learning-module.vercel.app/)

## ✨ Features

This module is packed with features designed to enhance the learning process:

-   **Segmented Content:** The course material is broken down into logical sections for each cipher mode (ECB, CBC, CFB, OFB, CTR) plus an introduction and a quiz.
-   **Interactive Navigation:** Users can switch between sections using a sticky navigation bar on desktop or a dropdown menu on mobile devices.
-   **Visual Aids:** Each mode is explained with clear diagrams, advantages, disadvantages, and technical formulas.
-   **Progress Tracking:** A visual progress bar at the top shows students how far they've progressed through the module.
-   **Review Quiz:** A dedicated section with questions and expandable answers to test student comprehension.
-   **High-Quality Downloads:**
    -   Download any individual section as a high-resolution JPEG image.
    -   Download all sections at once as a convenient ZIP file.
-   **Light & Dark Mode:** A persistent theme toggle for comfortable viewing.
-   **Fully Responsive:** Optimized for a seamless experience on desktops, tablets, and smartphones.

## 📚 Topics Covered

This module provides a comprehensive overview of the five primary block cipher modes of operation:

1.  **Introduction:** Core concepts like Block Ciphers and Initialization Vectors (IVs).
2.  **Electronic Codebook (ECB):** The simplest mode, highlighting its strengths and significant security weaknesses.
3.  **Cipher Block Chaining (CBC):** A widely used mode that introduces dependency between blocks.
4.  **Cipher Feedback (CFB):** Operation as a self-synchronizing stream cipher.
5.  **Output Feedback (OFB):** Operation as a synchronous stream cipher.
6.  **Counter (CTR):** A modern, high-performance mode that allows for parallel processing.
7.  **Review Quiz:** Questions comparing the security and error handling of the different modes.

## 🛠️ Tech Stack

-   **HTML5**
-   **CSS3** (with Custom Properties for theming)
-   **Vanilla JavaScript**
-   **[html2canvas.js](https://html2canvas.hertzen.com/)**: For capturing sections as images.
-   **[JSZip.js](https://stuk.github.io/jszip/)**: For creating ZIP archives in the browser.
-   **[FileSaver.js](https://github.com/eligrey/FileSaver.js/)**: For saving the generated files.
-   **[Font Awesome](https://fontawesome.com/)**: For icons.

## 🚀 Getting Started

No complex build steps or dependencies are required.

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/data-security-block-cipher-module.git](https://github.com/your-username/data-security-block-cipher-module.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd data-security-block-cipher-module
    ```
3.  Open the `index.html` file in your browser.

## Acknowledgments

-   This project was developed for the **Computer Engineering Department** at the **College of Engineering & Technology, AASTMT**.
-   **Course Instructor:** Dr. Mahmoud Yehia
-   **Lead Developer & TA:** Eng. Eslam Osama
