import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = (props: PaginationProps) => {
  const [pageInputValue, setPageInputValue] = useState(props.currentPage);
  useEffect(() => {
    console.log(pageInputValue);
    if (pageInputValue < 1) {
      setPageInputValue(1);
    }
    if (pageInputValue > props.totalPages) {
      setPageInputValue(props.totalPages);
    }
  }, [pageInputValue, props.totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      props.onPageChange(page);
    }
    if (page < 1) {
      props.onPageChange(1);
    }
    if (page > props.totalPages) {
      props.onPageChange(props.totalPages);
    }
  };

  const goToFirst = () => {
    goToPage(1);
  };

  const goToLast = () => {
    goToPage(props.totalPages);
  };

  const goToPrevious = () => {
    goToPage(props.currentPage - 1);
  };

  const goToNext = () => {
    goToPage(props.currentPage + 1);
  };

  const NumberButton = ({ page }: { page: number }) => {
    return (
      <Button
        text={page.toString()}
        action={() => goToPage(page)}
        disabled={props.currentPage === page}
        mainColor="primary"
        contextColor="default"
        className="!py-[10px] flex-1"
      />
    );
  };

  const GetPageButtons = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
    return (
      <>
        {currentPage > 3 && currentPage < totalPages - 2 && (
          <>
            <NumberButton page={1} />
            <span className="px-4">...</span>
            <NumberButton page={currentPage - 1} />
            <NumberButton page={currentPage} />
            <NumberButton page={currentPage + 1} />
            <span className="px-4">...</span>
            <NumberButton page={totalPages} />
          </>
        )}
        {currentPage < 3 && (
          <>
            <NumberButton page={1} />
            <NumberButton page={2} />
            <NumberButton page={3} />
            <span className="px-4">...</span>
            <NumberButton page={totalPages} />
          </>
        )}
        {currentPage > totalPages - 2 && (
          <>
            <NumberButton page={1} />
            <span className="px-4">...</span>
            <NumberButton page={totalPages - 2} />
            <NumberButton page={totalPages - 1} />
            <NumberButton page={totalPages} />
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex justify-between">
      <div className={`w-[50%] flex items-center gap-2 ${props.className}`}>
        {props.currentPage > 3 && (
          <Button
            text=""
            iconBefore={
              <div className="flex">
                <ChevronLeftIcon size={20} className="-mr-2 -ml-[2px]" />
                <ChevronLeftIcon size={20} className="-ml-2 -mr-[2px]" />
              </div>
            }
            action={goToFirst}
            disabled={props.currentPage === 1}
            mainColor="primary"
            contextColor="default"
            className="flex-1"
          />
        )}
        {props.currentPage > 1 && (
          <Button
            text=""
            iconBefore={<ChevronLeftIcon size={20} className="" />}
            action={goToPrevious}
            disabled={props.currentPage === 1}
            mainColor="primary"
            contextColor="default"
            className="flex-1"
          />
        )}
        <GetPageButtons currentPage={props.currentPage} totalPages={props.totalPages} />
        {props.currentPage < props.totalPages - 2 && (
          <Button
            text=""
            iconBefore={<ChevronRightIcon size={20} className="" />}
            action={goToNext}
            disabled={props.currentPage === props.totalPages}
            mainColor="primary"
            contextColor="default"
            className="flex-1"
          />
        )}
        {props.currentPage < props.totalPages - 2 && (
          <Button
            text=""
            iconBefore={
              <div className="flex">
                <ChevronRightIcon size={20} className="-mr-2 -ml-[2px]" />
                <ChevronRightIcon size={20} className="-ml-2 -mr-[2px]" />
              </div>
            }
            action={goToLast}
            disabled={props.currentPage === props.totalPages}
            mainColor="primary"
            contextColor="default"
            className="flex-1"
          />
        )}
      </div>
      <Input
        type="number"
        value={pageInputValue}
        name="page"
        className="w-[120px] text-center"
        delayOnChange={1000}
        onChangeBeforeDelay={(e) => setPageInputValue(Number(e.target.value))}
        onChange={(e) => goToPage(Number(e.target.value))}
      />
    </div>
  );
};

export default Pagination;
