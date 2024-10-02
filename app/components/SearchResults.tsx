import React from "react";
import { IAnswerDataSearch } from "@/app/interfaces/IAnswerDataSearch";
import ImageComponent from "@/app/components/ImageComponent"; // Adjust the path based on your folder structure

interface SearchResultsProps {
  searchs: IAnswerDataSearch[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchs }) => {
  return (
    <div className="search-results">
      {searchs.map((result, index) => (
        <div key={index} className="mb-4 p-2 border-b border-gray-500">
          <h3 className="text-lg font-bold">{result?.title}</h3>
          <p className="text-sm">{result?.summary}</p>

          {/* Exibir "Links" apenas se houver links válidos */}
          {result?.links && result?.links.length > 0 && (
            <div className="mt-1">
              <ul className="list-disc list-inside">
                {result?.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exibir "Images" apenas se houver imagens válidas */}
          {Array.isArray(result?.images) && result?.images.length > 0 && (
            <div className="mt-1">
              <div className="flex space-x-2">
                {result?.images.map((image, i) => (
                  <ImageComponent key={i} src={image} alt="Search result" />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
