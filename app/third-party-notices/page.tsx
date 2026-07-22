import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data & licences",
  description: "Third-party data attribution and licence information for Vocab.",
};

export default function ThirdPartyNoticesPage() {
  return (
    <main className="legal-page">
      <h1>Data &amp; licences</h1>
      <p>Mandarin vocabulary data is transformed from Complete HSK Vocabulary by drkameleon and is used under the MIT License.</p>
      <p><a href="https://github.com/drkameleon/complete-hsk-vocabulary">View the Complete HSK Vocabulary project</a></p>
      <h2>MIT License</h2>
      <p>Copyright (c) drkameleon</p>
      <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
      <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
      <p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
    </main>
  );
}
