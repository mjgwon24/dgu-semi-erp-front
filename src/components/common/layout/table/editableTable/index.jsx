import React, { useEffect, useState, useRef } from "react";
import { Table } from 'antd';
import EditableCell from '../tableCell';
import HeaderCell from '../tableHeader';
import EditableRow from '../tableRow';
import { Empty } from "antd";
import { renderPagination } from "@/src/components/common/layout/table/pagination";

/**
 * 페이징 기반 테이블 컴포넌트
 * @param dataSource 현재 페이지 데이터
 * @param setDataSource 데이터 변경 함수
 * @param defaultColumns 기본 컬럼 정보
 * @param loading 로딩 상태
 * @param setLoading 로딩 상태 변경 함수
 * @param count
 * @param selected 현재 선택된 행 인덱스
 * @param setSelected 선택된 행 인덱스 변경 함수
 * @param currentPage 현재 페이지 번호 (1-based)
 * @param setCurrentPage 현재 페이지 번호 변경 함수
 * @param permission 권한(admin, user)
 * @param width 테이블 너비
 * @param height 테이블 높이
 * @param onRowDoubleClick 행 더블 클릭 이벤트 핸들러
 * @param totalPages 전체 페이지 수
 * @param totalElements 전체 데이터 수
 *
 * @lastModified 2025-06-24
 */
const EditableTable = ({
                           dataSource,
                           setDataSource,
                           defaultColumns,
                           loading,
                           setLoading,
                           count,
                           selected,
                           setSelected,
                           currentPage,
                           setCurrentPage,
                           permission,
                           width,
                           height,
                           onRowDoubleClick,
                           totalPages,
                           totalElements
}) => {
    const tableRef = useRef(null);
    const isAdmin = permission === "admin";
    const [scrollConfig, setScrollConfig] = useState({
        x: "100%",
        y: 400,
    });

    /**
     * 행 저장 핸들러
     */
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.No === item.No);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
            No: item.No,
        });
        setDataSource(newData);
    };

    /**
     * 컬럼 가공
     */
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: isAdmin?col.editable:false,
                dataIndex: col.dataIndex,
                type: col.type,
                selects: col.selects,
                selectboxWidth: col.selectboxWidth,
                maxlength: col.maxlength,
                handleSave: handleSave,
                PositiveTitle: col.PositiveTitle,
                NagativeTitle: col.NagativeTitle,
                handlePositive: col.handlePositive,
                handleNagative: col.handleNagative,
            }),
        };
    });

    const handleRowClick = (rowIndex) => setSelected(rowIndex);
    const handlePageChange = (page) => setCurrentPage(page);

    /**
     * 테이블 스크롤 및 스타일 동기화
     */
    useEffect(() => {
        setScrollConfig((prev) => ({ ...prev, y: height }));

        setTimeout(() => {
            // 테이블 body 높이 조정
            Array.from(document.getElementsByClassName("ant-table-body")).forEach(
                (element) => {
                    element.style.maxHeight = `${height - 64}px`;
                    element.style.height = `${height - 64}px`;
                }
            );

            // 테이블 wrapper 스타일 적용
            Array.from(document.getElementsByClassName("ant-table-wrapper")).forEach(
                (element) => {
                    element.classList.add("rounded-md", "bg-white", "border", "border-gray-300");
                }
            );
        }, 100);
    }, [height, selected]);

    /**
     * 윈도우 리사이즈 시 스크롤 재설정
     */
    useEffect(() => {
        const handleResize = () => setScrollConfig((prev) => ({ ...prev, y: height }));
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [height, dataSource]);

    // 페이지 변경 시 선택된 행 초기화
    useEffect(() => {
        setSelected(0);
    },[currentPage]);

  return (
      <div className={`flex flex-col w-full max-w-[${width}] rounded-md`}>
          <div className={`h-[${height}px] overflow-hidden rounded-md bg-none`}>
              <div ref={tableRef} className="w-full overflow-hidden rounded-md bg-none">
                  <Table
                      className="rounded-md bg-white border border-gray-300"
                      style={{ height : `${height}px` }}
                      columns={columns}
                      dataSource={dataSource || []}
                      components={{
                          header: { cell: HeaderCell },
                          body: { row: EditableRow, cell: EditableCell },
                      }}
                      bordered={false}
                      pagination={false}
                      rowKey="No"
                      scroll={scrollConfig}
                      onRow={(record, rowIndex) => ({
                          index:rowIndex,
                          onClick: () => handleRowClick(rowIndex),
                          onDoubleClick: () => onRowDoubleClick?.(record),
                          className:
                              rowIndex === selected
                                  ? "bg-gray-100 font-semibold text-center"
                                  : "text-center",
                      })}
                      locale={{
                          emptyText: (
                              <div className="flex flex-col items-center justify-center text-gray-400 h-[418px]">
                                  <Empty description="조회된 데이터가 없습니다."/>
                              </div>
                          )
                      }}
                  />
              </div>
          </div>

          <div className="w-full flex flex-row justify-center">
              {renderPagination(currentPage, totalPages, handlePageChange)}
          </div>
      </div>
  );
};

export default EditableTable;
